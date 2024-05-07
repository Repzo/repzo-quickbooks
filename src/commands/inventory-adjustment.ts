import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/Item";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { set_error, paginate_max_result } from "../util.js";

/**
 * Event To Sync Inventory from Repzo
 * the command shall create an inventory adjustment with
 * the difference between all accumulated repzo warehouses and quick books inventory,
 * making quickbooks similar to Repzo accumulated inventory
 * @param commandEvent
 * @returns
 */
export const inventory_adjustment = async (
  commandEvent: CommandEvent,
): Promise<Result> => {
  const command_sync_id: string = commandEvent.sync_id || uuid();
  const { app }: any = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  const company_namespace = commandEvent.nameSpace.join("_");
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command,
  );
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken: commandEvent.oauth2_data?.access_token || "",
    realmId: commandEvent.oauth2_data?.realmId || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  // init result object
  const result: Result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report: FailedDocsReport = [];
  const sync: string[] = [];
  try {
    await commandLog.load(command_sync_id);

    await commandLog
      .addDetail("⌛ Syncing Inventory from Repzo ......")
      .commit();

    // return inventory quickbooks products
    const qb_items = await get_QuickBooks_inventory_items(qbo, app);

    result.quickBooks_total = qb_items.length;

    for (let i = 0; i < qb_items.length; i++) {
      const item = qb_items[i];
      try {
        const product = await get_repzo_product_by_integration_id(
          repzo,
          company_namespace,
          item,
        );

        const variant = product.variants?.find(
          (v) => v.integration_meta?.id == product.integration_meta?.id,
        );

        if (!variant)
          throw new Error(
            `Repzo Product: ${product.name} does not have matched variant with integration_meta.id: ${product.integration_meta?.id}`,
          );

        const repzo_inventories = await get_repzo_inventories_for_variant(
          repzo,
          variant,
        );

        if (!repzo_inventories.length)
          throw new Error(
            `Product / Variant: '${product.name} / ${variant.name}' does not have any inventory record in Repzo`,
          );

        sync.push(
          `Item: '${item.Name}' was found in ${repzo_inventories.length} inventory in Repzo`,
        );

        let total_qty = 0;
        repzo_inventories.forEach((inv) => {
          total_qty += inv.qty;
        });

        const current = item.QtyOnHand;
        item.QtyOnHand = total_qty;
        sync.push(
          `Try to update Item: '${item.Name}' from: ${current}, to: ${total_qty}`,
        );
        qbo.item.update(item);
        sync.push(`Item: '${item.Name}' Qty Updated Successfully`);
        result.updated++;
      } catch (e) {
        console.error(e);
        result.failed++;
        failed_docs_report.push({
          method: "update",
          doc_id: item.Id,
          doc: item,
          error_message: set_error(e),
        });
      }
    }

    await commandLog
      .addDetail(`✅  Complete Sync Inventory from Repzo`, sync)
      .setStatus(
        "success",
        failed_docs_report.length ? failed_docs_report : null,
      )
      .setBody(result)
      .commit();
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();
  } finally {
    return result;
  }
};

/**
 * Get repzo product by integration.id
 * @param repzo
 * @returns
 */
const get_repzo_product_by_integration_id = async (
  repzo: Repzo,
  company_namespace: string,
  quickbooks_item: Item.ItemObject,
): Promise<Service.Product.Find.Result["data"][0]> => {
  try {
    const integration_meta_id = company_namespace + "_" + quickbooks_item.Id;
    const result: Service.Product.Find.Result = await repzo.product.find({
      "integration_meta.id": integration_meta_id,
      // disabled: false,
      withVariants: true,
    });
    const product = result?.data?.[0];
    if (!product)
      throw new Error(
        `Product with integration_meta.id: ${integration_meta_id} was not found in Repzo`,
      );
    return product;
  } catch (err) {
    throw err;
  }
};

/**
 * Get Inventory Quickbooks Items
 * @param qb
 * @param app
 * @returns
 */
const get_QuickBooks_inventory_items = async (
  qb: QuickBooks,
  app: any,
): Promise<Item.ItemObject[]> => {
  try {
    const { Products } = app.formData;
    let query = `select * from Item where Type In ('Inventory') ORDER BY Id`;
    // if (Products.pullInventoryItems) {
    //   query += ` where Type In ('Inventory')`;
    // } else {
    //   throw new Error(`Please Pull - Items with Inventory type from QuickBooks to Repzo First`)
    // }

    const qb_items: Item.ItemObject[] = [];

    for (let i = 0; i < 30; i++) {
      const result = await qb.item.query({
        query:
          query +
          ` STARTPOSITION ${
            i * paginate_max_result
          } MAXRESULTS ${paginate_max_result}`,
      });
      qb_items.push(...result.QueryResponse.Item);
      if (
        !result?.QueryResponse?.Item?.length ||
        result?.QueryResponse?.Item?.length < paginate_max_result
      )
        break;
    }

    return qb_items;
  } catch (err) {
    throw err;
  }
};

/**
 * Get repzo inventories by variant
 * @param repzo
 * @returns
 */
const get_repzo_inventories_for_variant = async (
  repzo: Repzo,
  variant: Service.Variant.VariantSchema,
): Promise<Service.Inventory.InventorySchema[]> => {
  try {
    const result = await repzo.inventory.find({
      variant_id: variant._id,
      per_page: 5000,
    });
    return result?.data;
  } catch (err) {
    throw err;
  }
};
