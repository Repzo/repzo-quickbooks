import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
export const items = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f;
  const command_sync_id = commandEvent.sync_id || uuid();
  const { app } = commandEvent || {};
  let result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
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
      (_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token,
    realmId:
      (_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    await commandLog.load(command_sync_id);
    await commandLog
      .addDetail("Repzo QuickBooks: Started Syncing Products")
      .commit();
    if (
      !((_d = app.options_formData) === null || _d === void 0
        ? void 0
        : _d.bench_time_products)
    ) {
      await commandLog
        .setStatus("skipped")
        .setBody("bench_time_products undefined")
        .commit();
    }
    // return all repzo items
    let qb_items = await get_all_QuickBooks_items(qbo, app);
    // return all quickbooks products
    let repzo_products = await get_all_repzo_products(repzo);
    result.QuickBooks_total =
      (_f =
        (_e = qb_items.QueryResponse) === null || _e === void 0
          ? void 0
          : _e.Item) === null || _f === void 0
        ? void 0
        : _f.length;
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
    // foreach quickbooks items exist or not
    qb_items.QueryResponse.Item.forEach(async (item) => {
      var _a, _b, _c, _d;
      const repzo_default_category = await get_repzo_default_category(
        repzo,
        (_a = item.ParentRef) === null || _a === void 0 ? void 0 : _a.name
      );
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
            (_c =
              (_b = existProduct[0]) === null || _b === void 0
                ? void 0
                : _b.integration_meta) === null || _c === void 0
              ? void 0
              : _c.QuickBooks_last_sync
          ) <
          new Date(
            (_d = item.MetaData) === null || _d === void 0
              ? void 0
              : _d.LastUpdatedTime
          )
        ) {
          try {
            await commandLog
              .addDetail(
                `update repzo product id -- ${existProduct[0]._id} ...`
              )
              .commit();
            let repzo_product = map_products(item, repzo_default_category._id);
            await repzo.product.update(existProduct[0]._id, repzo_product);
            result["updated"] = result["updated"] + 1 || 1;
          } catch (err) {
            console.error(err);
            result["failed"] = result["failed"] + 1 || 1;
          }
        }
      } else {
        //create a new  repzo client
        try {
          await commandLog
            .addDetail(`create a new repzo product name -- ${item.Name} ...`)
            .commit();
          let repzo_product = map_products(item, repzo_default_category._id);
          await repzo.product.create(repzo_product);
          result["created"] = result["created"] + 1 || 1;
        } catch (err) {
          console.error(err);
          result["failed"] = result["failed"] + 1 || 1;
        }
      }
    });
    promisify(qb_items.QueryResponse.Item, repzo_products, repzo).then((res) =>
      Promise.all(res).then((values) => {
        var _a;
        commandLog
          .addDetail(
            `Done : Sync ${values.length} Item / Product , bench_time  ${
              (_a = commandEvent.app.options_formData) === null || _a === void 0
                ? void 0
                : _a.bench_time_products
            }`
          )
          .commit();
      })
    );
    // commandLog Complete Sync QuickBooks items to Repzo
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();
  }
  return result;
};
const promisify = (qb_items, repzo_products, repzo) => {
  let pro = [{}];
  pro.pop();
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
            pro.push(repzo.product.update(existProduct[0]._id, repzo_product));
          }
        } else {
          //create a new  repzo client
          let repzo_product = map_products(item, repzo_default_category._id);
          pro.push(repzo.product.create(repzo_product));
        }
        if (index === array.length - 1) resolve(pro);
      });
    });
  });
};
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
const get_all_QuickBooks_items = async (qb, app) => {
  const { Products } = app.formData;
  let { bench_time_products } = app.options_formData;
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
