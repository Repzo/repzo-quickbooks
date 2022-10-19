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
      ((_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token) || "",
    realmId:
      ((_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId) || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  let result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };
  return new Promise(async (resolve, reject) => {
    try {
      await commandLog.load(command_sync_id);
      await commandLog
        .addDetail("Repzo QuickBooks: Started Syncing Taxs")
        .commit();
      if (!app.options_formData[bench_time_key]) {
        await commandLog.addDetail("bench_time_taxs undefined").commit();
      }
      // return all repzo taxs
      let qb_taxs = await get_all_QuickBooks_taxs(qbo);
      // return all quickbooks taxs
      let repzo_taxs = await get_all_repzo_taxs(repzo);
      Promise.all(get_promisify_jobs(qb_taxs, repzo_taxs, repzo))
        .then((values) => {
          result.sync = values.length;
          commandLog
            .addDetail(
              `Complete : Sync ${values.length} TaxRate with Quickbooks`
            )
            .setBody(result)
            .commit();
          resolve(result);
        })
        .catch((err) => {
          console.error(`failed to complete sync due to an exception : ${err}`);
          commandLog.setStatus("fail", err).setBody(result).commit();
          reject(result);
        });
    } catch (err) {
      await commandLog.setStatus("fail", err).setBody(result).commit();
      reject(result);
    }
  });
};
const get_promisify_jobs = (qb_taxs, repzo_taxs, repzo) => {
  let jobs = []; // save all jobs here
  qb_taxs.QueryResponse.TaxRate.forEach((tax, index, array) => {
    var _a, _b, _c;
    let existTax = repzo_taxs.filter((i) => {
      var _a;
      return (
        ((_a = i.integration_meta) === null || _a === void 0
          ? void 0
          : _a.QuickBooks_id) === tax.Id
      );
    });
    if (existTax[0]) {
      if (
        new Date(
          (_b =
            (_a = existTax[0]) === null || _a === void 0
              ? void 0
              : _a.integration_meta) === null || _b === void 0
            ? void 0
            : _b.QuickBooks_last_sync
        ) <
        new Date(
          (_c = tax.MetaData) === null || _c === void 0
            ? void 0
            : _c.LastUpdatedTime
        )
      ) {
        let repzo_tax = map_taxs(tax);
        jobs.push(repzo.tax.update(existTax[0]._id, repzo_tax));
      }
    } else {
      //create a new  repzo client
      let repzo_tax = map_taxs(tax);
      jobs.push(repzo.tax.create(repzo_tax));
    }
  });
  return jobs;
};
const get_all_repzo_taxs = async (repzo) => {
  try {
    const repzo_taxes = await repzo.tax.find({
      per_page: 50000,
      disabled: false,
    });
    return repzo_taxes.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
const get_all_QuickBooks_taxs = async (qb) => {
  try {
    let query = `Select * From TaxRate`;
    const qb_taxs = await qb.taxRate.query({
      query,
    });
    return qb_taxs;
  } catch (err) {
    throw err;
  }
};
const map_taxs = (tax) => {
  return {
    name: tax.Name,
    rate: Number(tax.RateValue) / 100,
    type: "inclusive",
    integration_meta: {
      QuickBooks_id: tax.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};