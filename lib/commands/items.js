import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
var result = {
  QuickBooks_total: 0,
  repzo_total: 0,
  created: 0,
  updated: 0,
  failed: 0,
};
export const items = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  // init Repzo object
  const repzo = new Repzo(
    (_a = commandEvent.app.formData) === null || _a === void 0
      ? void 0
      : _a.repzoApiKey,
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
    // init Repzo object
    const repzo = new Repzo(
      (_d = commandEvent.app.formData) === null || _d === void 0
        ? void 0
        : _d.repzoApiKey,
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
        ((_e = commandEvent.oauth2_data) === null || _e === void 0
          ? void 0
          : _e.access_token) || "",
      realmId:
        ((_f = commandEvent.oauth2_data) === null || _f === void 0
          ? void 0
          : _f.realmId) || "",
      sandbox: true,
    });
    // sync_products_from_QuickBooks_to_repzo
    if (
      !((_g = commandEvent.app.formData) === null || _g === void 0
        ? void 0
        : _g.bench_time_client)
    ) {
      await commandLog
        .setStatus("skipped")
        .setBody("bench_time_client undefined")
        .commit();
    }
    let res = await sync_products_from_QuickBooks_to_repzo(
      repzo,
      qbo,
      (_h = commandEvent.app.formData) === null || _h === void 0
        ? void 0
        : _h.bench_time_client
    );
    await commandLog
      .setStatus("success")
      .setBody("Complete Sync QuickBooks custommers to Repzo")
      .commit();
    return res;
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();
    return result;
  }
};
const sync_products_from_QuickBooks_to_repzo = async (
  repzo,
  qb,
  bench_time_client
) => {
  try {
    const qb_items = await get_all_QuickBooks_items(
      qb,
      "Inventory",
      1000,
      bench_time_client
    );
    let repzo_products = await get_all_repzo_products(repzo);
    result.QuickBooks_total = qb_items.QueryResponse.Item.length;
    result.repzo_total = repzo_products.length;
    repzo_products = repzo_products.filter((i) => {
      var _a;
      return (
        ((_a = i.integration_meta) === null || _a === void 0
          ? void 0
          : _a.QuickBooks_id) !== undefined
      );
    });
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
            console.log(
              `update repzo product id -- ${existProduct[0]._id} ...`
            );
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
          console.log(`create a new repzo product name -- ${item.Name} ...`);
          let repzo_product = map_products(item, repzo_default_category._id);
          await repzo.product.create(repzo_product);
          result["created"] = result["created"] + 1 || 1;
        } catch (err) {
          console.error(err);
          result["failed"] = result["failed"] + 1 || 1;
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
  return result;
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
const get_all_QuickBooks_items = async (
  qb,
  type,
  maxresults = 1,
  bench_time_client
) => {
  try {
    const qb_items = await qb.item.query({
      query: `select * from Item where Type='${type}' maxresults ${maxresults}`,
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