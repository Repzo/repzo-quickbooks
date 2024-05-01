import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/Item";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { set_error, update_bench_time, paginate_max_result } from "../util.js";

const bench_time_key = "bench_time_disabled_products";

/**
 * Event To Sync Quickbooks InActive Items - Repzo products
 * @param commandEvent
 * @returns
 */
export const inactive_items = async (
  commandEvent: CommandEvent,
): Promise<Result> => {
  // const new_bench_time = new Date().toISOString();
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
  let result: Result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report: FailedDocsReport = [];
  let sync: string[] = [];
  try {
    const new_bench_time = new Date().toISOString();
    await commandLog.load(command_sync_id);

    await commandLog.addDetail("⌛ Syncing InActive Products ......").commit();

    const qb_items = await get_inactive_QuickBooks_items(qbo, app);
    result.quickBooks_total = qb_items?.length;

    const items_integration_meta_ids: string[] = qb_items.map(
      (item) => company_namespace + "_" + item.Id,
    );
    // return all repzo items
    const repzo_active_products = await get_active_repzo_products(
      repzo,
      items_integration_meta_ids,
    );
    result.repzo_total = repzo_active_products?.length;

    for (let i = 0; i < qb_items?.length; i++) {
      const item = qb_items[i];
      if (item.Active) continue;

      const repzo_product = repzo_active_products.find(
        (i) => i.integration_meta?.id === `${company_namespace}_${item.Id}`,
      );

      if (repzo_product) {
        try {
          sync.push(repzo_product.name);
          await repzo.product.remove(repzo_product._id);
          result.updated++;
        } catch (e) {
          result.failed++;
          failed_docs_report.push({
            method: "update",
            doc_id: repzo_product._id,
            doc: repzo_product,
            error_message: set_error(e),
          });
        }
      }
    }

    await update_bench_time(
      repzo,
      commandEvent.app._id,
      bench_time_key,
      new_bench_time,
    );

    await commandLog
      .addDetail(`✅  Complete Sync Inactive Products`, sync)
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
 * Get all repzo products
 * @param repzo
 * @returns
 */
const get_active_repzo_products = async (
  repzo: Repzo,
  items_integration_meta_ids: string[],
): Promise<
  Pick<
    Service.Product.Find.Result["data"][0],
    "_id" | "name" | "active" | "integration_meta"
  >[]
> => {
  try {
    const result = await repzo.product.find({
      "integration_meta.id": items_integration_meta_ids,
      active: true,
      per_page: 50000,
    });

    const repzo_products: Pick<
      Service.Product.Find.Result["data"][0],
      "_id" | "name" | "active" | "integration_meta"
    >[] = result.data.map((doc) => {
      return {
        _id: doc._id,
        name: doc.name,
        active: doc.active,
        integration_meta: doc.integration_meta,
      };
    });

    return repzo_products;
  } catch (err) {
    throw err;
  }
};

/**
 * Get Inactive Quickbooks Items
 * @param qb
 * @param app
 * @returns
 */
const get_inactive_QuickBooks_items = async (
  qb: QuickBooks,
  app: any,
): Promise<Item.ItemObject[]> => {
  const { Products } = app.formData;
  let bench_time_disabled_products = app.options_formData[bench_time_key];
  try {
    let query = `select * from Item where Active = false`;

    if (bench_time_disabled_products) {
      // bench_time_disabled_products = bench_time_disabled_products.slice(0, 10);
      query += `MetaData.LastUpdatedTime >= '${bench_time_disabled_products}'`;
    }

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
