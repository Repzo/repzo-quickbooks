import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/item";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";

// const new_bench_time = new Date().toISOString();
const bench_time_key = "bench_time_products";

export const items = async (commandEvent: CommandEvent): Promise<Result> => {
  const command_sync_id: string = commandEvent.sync_id || uuid();
  const { app }: any = commandEvent || {};

  // init Repzo object
  const repzo = new Repzo(app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );

  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken: commandEvent.oauth2_data?.access_token,
    realmId: commandEvent.oauth2_data?.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });

  let result: Result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };
  return new Promise<Result>(async (resolve, reject) => {
    try {
      await commandLog.load(command_sync_id);
      await commandLog
        .addDetail("Repzo QuickBooks: Started Syncing Products")
        .commit();

      if (!app.options_formData[bench_time_key]) {
        await commandLog.addDetail("bench_time_products undefined").commit();
      }
      // return all repzo items
      let qb_items = await get_all_QuickBooks_items(qbo, app);
      // return all quickbooks products
      let repzo_products = await get_all_repzo_products(repzo);
      result.QuickBooks_total = qb_items.QueryResponse?.Item?.length;
      result.repzo_total = repzo_products?.length;
      repzo_products = repzo_products.filter(
        (i) => i.integration_meta?.QuickBooks_id !== undefined
      );

      get_promisify_jobs(qb_items.QueryResponse.Item, repzo_products, repzo)
        .then((res) =>
          Promise.all(res).then((values) => {
            result.sync = values.length;
            commandLog
              .setStatus("success")
              .addDetail(
                `Complete : Sync ${values.length} Item / Product with Quickbooks`
              )
              .setBody(result)
              .commit();
            resolve(result);
          })
        )
        .catch((err) => {
          reject(result);
          commandLog.setStatus("fail", err).setBody(result).commit();
        });
      // commandLog Complete Sync QuickBooks items to Repzo
    } catch (err) {
      console.error(`failed to complete sync due to an exception : ${err}`);
      reject(result);
    }
  });
};

const get_promisify_jobs = (
  qb_items: Item.itemObject[],
  repzo_products: Service.Product.Get.Result[],
  repzo: Repzo
) => {
  let jobs: any[] = []; // save all jobs here
  return new Promise<any[]>((resolve, reject) => {
    qb_items.forEach((item, index, array) => {
      get_repzo_default_category(repzo, item.ParentRef?.name).then(
        (repzo_default_category) => {
          let existProduct = repzo_products.filter(
            (i) => i.integration_meta?.QuickBooks_id === item.Id
          );
          if (existProduct[0]) {
            if (
              new Date(
                existProduct[0]?.integration_meta?.QuickBooks_last_sync
              ) < new Date(item.MetaData?.LastUpdatedTime)
            ) {
              let repzo_product = map_products(
                item,
                repzo_default_category._id
              );
              jobs.push(
                repzo.product.update(existProduct[0]._id, repzo_product)
              );
            }
          } else {
            //create a new  repzo client
            let repzo_product = map_products(item, repzo_default_category._id);
            jobs.push(repzo.product.create(repzo_product));
          }
          if (index === array.length - 1) resolve(jobs);
        }
      );
    });
  });
};

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
      });
      next_page_url = repzoObj.next_page_url;
      repzo_products = [...repzo_products, ...repzoObj.data];
    }
    return repzo_products;
  } catch (err) {
    console.error(err);
    return [];
  }
};

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
          name: "default",
          local_name: "Created by Quickbooks",
        });
      }
    } else {
      let repzoObj = await repzo.category.find({
        name: "default",
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
    console.error(err);
    throw err;
  }
};

const get_all_QuickBooks_items = async (
  qb: QuickBooks,
  app: any
): Promise<Item.Find.Result> => {
  const { Products } = app.formData;
  let bench_time_products = app.options_formData[bench_time_key];

  try {
    let query = `select * from Item where Type In`;
    if (Products.pullInventoryItems || Products.pullServiceItems) {
      query += `(`;
      if (Products.pullInventoryItems) {
        query += `'Inventory'`;
      }
      if (Products.pullServiceItems) {
        query += `,'Service'`;
      }
      query += `)`;
    }
    if (bench_time_products) {
      bench_time_products = bench_time_products.slice(0, 10);
      query += ` AND MetaData.LastUpdatedTime >= '${bench_time_products}'`;
    }
    query += ` maxresults 1000`;

    const qb_items = await qb.item.query({
      query,
    });
    return qb_items;
  } catch (err) {
    throw err;
  }
};

const map_products = (
  item: Item.itemObject,
  categoryID: string
): Service.Product.Create.Body => {
  return {
    name: item.Name,
    description: item.Description,
    active: item.Active,
    sku: item.Sku,
    local_name: item.FullyQualifiedName,
    base_price: item.UnitPrice ? String(Math.round(item.UnitPrice * 1000)) : "",
    category: categoryID,
    variants: [
      {
        default: true,
        disabled: false,
        name: item.Name,
        price: item.UnitPrice ? Math.round(item.UnitPrice * 1000) : 0,
      },
    ],
    integration_meta: {
      QuickBooks_id: item.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
