import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
// const new_bench_time = new Date().toISOString();
const bench_time_key = "bench_time_taxs";
export const taxs = async (commandEvent) => {
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
      (_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token,
    realmId:
      (_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });
  let result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };
  try {
    // await commandLog.load(command_sync_id);
    // await commandLog
    //   .addDetail("Repzo QuickBooks: Started Syncing Taxs")
    //   .commit();
    if (!app.options_formData[bench_time_key]) {
      await commandLog
        .setStatus("skipped")
        .setBody("bench_time_taxs undefined")
        .commit();
    }
    // return all repzo taxs
    // let qb_taxs = await get_all_QuickBooks_taxs(qbo, app);
    // return all quickbooks taxs
    let repzo_taxs = await get_all_repzo_taxs(repzo);
    console.log(repzo_taxs);
  } catch (err) {
    console.error(`failed to complete sync due to an exception : ${err}`);
    await commandLog
      .setStatus("fail", "failed to complete sync due to an exception")
      .setBody(err)
      .commit();
  }
  return result;
};
const promisify = (qb_taxs, repzo_taxs, repzo) => {
  let jobs = []; // save all jobs here
  return new Promise((resolve, reject) => {
    qb_taxs.forEach((item, index, array) => {
      var _a;
      get_repzo_default_category(
        repzo,
        (_a = item.ParentRef) === null || _a === void 0 ? void 0 : _a.name
      ).then((repzo_default_category) => {
        var _a, _b, _c;
        let existProduct = repzo_taxs.filter((i) => {
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
            let repzo_product = map_taxs(item, repzo_default_category._id);
            jobs.push(repzo.product.update(existProduct[0]._id, repzo_product));
          }
        } else {
          //create a new  repzo client
          let repzo_product = map_taxs(item, repzo_default_category._id);
          jobs.push(repzo.product.create(repzo_product));
        }
        if (index === array.length - 1) resolve(jobs);
      });
    });
  });
};
const get_all_repzo_taxs = async (repzo) => {
  try {
    console.log("Searching for taxs");
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_taxs;
    repzo_taxs = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.tax.find({
        page: 1,
        per_page,
        disabled: false,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_taxs = [...repzo_taxs, ...repzoObj.data];
    }
    return repzo_taxs;
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
const get_all_QuickBooks_taxs = async (qb, app) => {
  const { taxs } = app.formData;
  let bench_time_taxs = app.options_formData[bench_time_key];
  try {
    let query = `select * from Item where Type In`;
    if (taxs.pullInventorytaxs || taxs.pullServicetaxs) {
      query += `(`;
      if (taxs.pullInventorytaxs) {
        query += `'Inventory'`;
      }
      if (taxs.pullServicetaxs) {
        query += `,'Service'`;
      }
      query += `)`;
    }
    if (bench_time_taxs) {
      bench_time_taxs = bench_time_taxs.slice(0, 10);
      query += ` AND MetaData.LastUpdatedTime >= '${bench_time_taxs}'`;
    }
    query += ` maxresults 1000`;
    const qb_taxs = await qb.item.query({
      query,
    });
    return qb_taxs;
  } catch (err) {
    throw err;
  }
};
const map_taxs = (item, categoryID) => {
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
