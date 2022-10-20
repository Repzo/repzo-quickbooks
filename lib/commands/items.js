import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
// const new_bench_time = new Date().toISOString();
const bench_time_key = "bench_time_products";
/**
 * Event To Sync Quickbooks Items - Repzo products
 * @param commandEvent
 * @returns
 */
export const items = async (commandEvent) => {
  var _a, _b, _c;
  const command_sync_id = commandEvent.sync_id || uuid();
  const { app } = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(
    (_a = app.formData) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken:
      ((_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token) || "",
    realmId:
      ((_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId) || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  // init result object
  let result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };
  return new Promise(async (resolve, reject) => {
    var _a, _b;
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
      result.QuickBooks_total =
        (_b =
          (_a = qb_items.QueryResponse) === null || _a === void 0
            ? void 0
            : _a.Item) === null || _b === void 0
          ? void 0
          : _b.length;
      result.repzo_total =
        repzo_products === null || repzo_products === void 0
          ? void 0
          : repzo_products.length;
      repzo_products = repzo_products.filter((i) => {
        var _a;
        return (
          ((_a = i.integration_meta) === null || _a === void 0
            ? void 0
            : _a.QuickBooks_id) !== undefined
        );
      });
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
/**
 * Get Promisify Async Jobs
 * @param qb_items
 * @param repzo_products
 * @param repzo
 * @returns
 */
const get_promisify_jobs = (qb_items, repzo_products, repzo) => {
  let jobs = []; // save all jobs here
  return new Promise((resolve, reject) => {
    qb_items.forEach((item, index, array) => {
      var _a;
      get_repzo_default_category(
        repzo,
        (_a = item.ParentRef) === null || _a === void 0 ? void 0 : _a.name
      ).then((repzo_default_category) => {
        var _a, _b, _c;
        let existProduct = repzo_products.filter((i) => {
          var _a;
          return (
            ((_a = i.integration_meta) === null || _a === void 0
              ? void 0
              : _a.QuickBooks_id) === item.Id
          );
        });
        if (existProduct[0]) {
          if (
            new Date(
              (_b =
                (_a = existProduct[0]) === null || _a === void 0
                  ? void 0
                  : _a.integration_meta) === null || _b === void 0
                ? void 0
                : _b.QuickBooks_last_sync
            ) <
            new Date(
              (_c = item.MetaData) === null || _c === void 0
                ? void 0
                : _c.LastUpdatedTime
            )
          ) {
            let repzo_product = map_products(item, repzo_default_category._id);
            jobs.push(repzo.product.update(existProduct[0]._id, repzo_product));
          }
        } else {
          //create a new  repzo client
          let repzo_product = map_products(item, repzo_default_category._id);
          jobs.push(repzo.product.create(repzo_product));
        }
        if (index === array.length - 1) resolve(jobs);
      });
    });
  });
};
/**
 * Get all repzo products
 * @param repzo
 * @returns
 */
const get_all_repzo_products = async (repzo) => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_products;
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
/**
 * Get repzo category
 * @param repzo
 * @param name
 * @returns
 */
const get_repzo_default_category = async (repzo, name) => {
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
/**
 * Get All Quickbooks Items
 * @param qb
 * @param app
 * @returns
 */
const get_all_QuickBooks_items = async (qb, app) => {
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
/**
 * Map Items and Products
 * @param item
 * @param categoryID
 * @returns
 */
const map_products = (item, categoryID) => {
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
