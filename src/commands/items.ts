import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/Item";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { set_error, update_bench_time } from "../util.js";

const bench_time_key = "bench_time_products";

/**
 * Event To Sync Quickbooks Items - Repzo products
 * @param commandEvent
 * @returns
 */
export const items = async (commandEvent: CommandEvent): Promise<Result> => {
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
    commandEvent.command
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

    await commandLog.addDetail("⌛ Syncing Products ......").commit();

    // await commandLog
    //   .addDetail(
    //     `Syncing Products since ${
    //       commandEvent.app?.options_formData?.[bench_time_key] || "ever"
    //     }`,
    //   )
    //   .commit();
    // if (!app.options_formData[bench_time_key]) {
    //   await commandLog.addDetail("❌  bench_time_products undefined").commit();
    // }
    // return all repzo items
    let qb_items = await get_all_QuickBooks_items(qbo, app);
    // return all quickbooks products

    let repzo_products = await get_all_repzo_products(repzo);

    result.quickBooks_total = qb_items.QueryResponse?.Item?.length;
    result.repzo_total = repzo_products?.length;
    repzo_products = repzo_products.filter(
      (i) => i.integration_meta?.id !== undefined // i.integration_meta?.quickBooks_id !== undefined,
    );

    const repzo_taxes = await repzo.tax.find({ per_page: 5000 });

    for (let i = 0; i < qb_items.QueryResponse?.Item?.length; i++) {
      const item = qb_items.QueryResponse.Item[i];

      const repzo_default_category = await get_repzo_default_category(
        repzo,
        item.ParentRef?.name
      );

      let repzo_tax;
      if (item.SalesTaxCodeRef?.value) {
        const tax_type = item.SalesTaxIncluded ? "inclusive" : "additive";
        repzo_tax = repzo_taxes?.data.find(
          (tax) =>
            tax.integration_meta?.id ==
            `${company_namespace}_${item.SalesTaxCodeRef?.value}_${tax_type}`
        );
        if (!repzo_tax) {
          result.failed++;
          failed_docs_report.push({
            method: "update",
            doc_id: item.Id,
            doc: item,
            error_message: set_error(
              `Tax with QB Id: ${item.SalesTaxCodeRef?.value} was not found on Repzo`
            ),
          });
          continue;
        }
      }

      let existProduct = repzo_products.find(
        (i) => i.integration_meta?.id === `${company_namespace}_${item.Id}` // i.integration_meta?.quickBooks_id === item.Id,
      );
      if (existProduct) {
        if (
          new Date(existProduct?.integration_meta?.QuickBooks_last_sync) <
          new Date(item.MetaData?.LastUpdatedTime)
        ) {
          let repzo_product = map_products(
            item,
            repzo_default_category._id,
            repzo_tax?._id,
            company_namespace
          );
          repzo_product.variants?.forEach((variant) => {
            // variant._id =
            const matched_variant = existProduct?.variants?.find(
              (repzo_variant) =>
                repzo_variant.integration_meta?.id ==
                variant?.integration_meta?.id
            );
            if (matched_variant) {
              variant._id = matched_variant._id;
            }
          });
          try {
            sync.push(repzo_product.name);
            await repzo.product.update(existProduct._id, repzo_product);
            result.updated++;
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "update",
              doc_id: existProduct._id,
              doc: repzo_product,
              error_message: set_error(e),
            });
          }
        }
      } else {
        //create a new  repzo product
        let repzo_product = map_products(
          item,
          repzo_default_category._id,
          repzo_tax?._id,
          company_namespace
        );
        try {
          sync.push(repzo_product.name);
          await repzo.product.create(repzo_product);
          result.created++;
        } catch (e) {
          result.failed++;
          failed_docs_report.push({
            method: "create",
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
      new_bench_time
    );

    await commandLog
      .addDetail(`✅  Complete Sync Products`, sync)
      .setStatus(
        "success",
        failed_docs_report.length ? failed_docs_report : null
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
const get_all_repzo_products = async (
  repzo: Repzo
): Promise<Service.Product.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_products: any[];
    repzo_products = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.product.find({
        page: 1,
        per_page,
        disabled: false,
        withVariants: true,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_products = [...repzo_products, ...repzoObj.data];
    }
    return repzo_products;
  } catch (err) {
    throw err;
  }
};

/**
 * Get repzo category
 * @param repzo
 * @param name
 * @returns
 */
const get_repzo_default_category = async (
  repzo: Repzo,
  name: string | undefined
): Promise<Service.Category.Get.Result> => {
  try {
    if (name) {
      let repzoObj = await repzo.category.find({
        name,
        disabled: false,
      });
      if (repzoObj.data[0]) {
        return repzoObj.data[0];
      } else {
        return await repzo.category.create({
          name: name,
          local_name: "Created by Quickbooks",
        });
      }
    } else {
      let repzoObj = await repzo.category.find({
        name: "Default",
        disabled: false,
      });
      if (repzoObj.data[0]) {
        return repzoObj.data[0];
      } else {
        return await repzo.category.create({
          name: "default",
          local_name: "Created by Quickbooks",
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Get All Quickbooks Items
 * @param qb
 * @param app
 * @returns
 */
const get_all_QuickBooks_items = async (
  qb: QuickBooks,
  app: any
): Promise<Item.Find.Result> => {
  const { Products } = app.formData;
  let bench_time_products = app.options_formData[bench_time_key];
  try {
    let query = `select * from Item`;
    if (Products.pullInventoryItems || Products.pullServiceItems) {
      query += ` where Type In`;
      query += `(`;
      query += `'NonInventory'`;
      if (Products.pullInventoryItems) {
        query += `,'Inventory'`;
      }
      if (Products.pullServiceItems) {
        query += `,'Service'`;
      }
      query += `)`;
    }
    if (
      (Products.pullInventoryItems || Products.pullServiceItems) &&
      bench_time_products
    ) {
      query += ` AND `;
    }
    if (bench_time_products) {
      // bench_time_products = bench_time_products.slice(0, 10);

      query += `MetaData.LastUpdatedTime >= '${bench_time_products}'`;
    }
    query += ` maxresults 1000`;

    const qb_items = await qb.item.query({ query });

    return qb_items;
  } catch (err) {
    throw err;
  }
};

/**
 * Map Items and Products
 * @param item
 * @param categoryID
 * @returns
 */
const map_products = (
  item: Item.ItemObject,
  categoryID: string,
  taxId: string | undefined,
  company_namespace: string
): Service.Product.Create.Body => {
  return {
    name: item.Name,
    description: item.Description,
    active: item.Active,
    sku: item.Sku,
    local_name: item.FullyQualifiedName,
    base_price: item.UnitPrice ? String(Math.round(item.UnitPrice * 1000)) : "",
    category: categoryID,
    sv_tax: taxId,
    variants: [
      {
        default: true,
        disabled: false,
        sku: item.Sku,
        name: item.Name,
        price: item.UnitPrice ? Math.round(item.UnitPrice * 1000) : 0,
        integration_meta: {
          id: company_namespace + "_" + item.Id,
          quickBooks_id: item.Id,
          QuickBooks_last_sync: new Date().toISOString(),
        },
      },
    ],
    integration_meta: {
      id: company_namespace + "_" + item.Id,
      quickBooks_id: item.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
