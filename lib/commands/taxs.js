import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
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
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  try {
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("⌛ Syncing Taxs ....").commit();
    if (!app.options_formData[bench_time_key]) {
      await commandLog.addDetail("bench_time_taxs undefined").commit();
    }
    // return all repzo taxs
    let qb_taxs = await get_all_QuickBooks_taxs(qbo);
    // return all quickbooks taxs
    let repzo_taxs = await get_all_repzo_taxs(repzo);
    qb_taxs.QueryResponse.TaxRate.forEach(async (tax, index, array) => {
      var _a, _b, _c, _d;
      let existTax = repzo_taxs.filter((i) => {
        var _a;
        return (
          ((_a = i.integration_meta) === null || _a === void 0
            ? void 0
            : _a.quickBooks_id) === tax.Id
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
            ) ||
          ((_d = existTax[0]) === null || _d === void 0 ? void 0 : _d.rate) !==
            Number(tax.RateValue) / 100
        ) {
          let repzo_tax = map_taxs(tax);
          try {
            result.updated++;
            await repzo.tax.update(existTax[0]._id, repzo_tax);
          } catch (e) {
            result.failed++;
          }
        }
      } else {
        //create a new  repzo client
        let repzo_tax = map_taxs(tax);
        try {
          result.created++;
          await repzo.tax.create(repzo_tax);
        } catch (e) {
          result.failed++;
        }
      }
      // end async calls
      if (index === array.length - 1) {
        await commandLog
          .addDetail(`✅  Complete Sync Taxs`)
          .setStatus("success")
          .setBody(result)
          .commit();
      }
    });
  } catch (err) {
    await commandLog.setStatus("fail", err).setBody(result).commit();
  } finally {
    return result;
  }
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
    const qb_taxs = await qb.tax.query({
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
      quickBooks_id: tax.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
