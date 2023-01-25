import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { set_error } from "../util.js";
const bench_time_key = "bench_time_taxs";
export const taxs = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const command_sync_id = commandEvent.sync_id || uuid();
  const { app } = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(
    (_a = app.formData) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  const company_namespace = commandEvent.nameSpace.join("_");
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
  const failed_docs_report = [];
  try {
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("⌛ Syncing Taxes ....").commit();
    // if (!app.options_formData[bench_time_key]) {
    //   await commandLog.addDetail("bench_time_taxs undefined").commit();
    // }
    // return all repzo taxs
    let qb_taxs = await get_all_QuickBooks_taxs(qbo);
    // return all quickbooks taxs
    let repzo_taxs = await get_all_repzo_taxs(repzo);
    result.quickBooks_total =
      (_e =
        (_d = qb_taxs.QueryResponse) === null || _d === void 0
          ? void 0
          : _d.TaxRate) === null || _e === void 0
        ? void 0
        : _e.length;
    result.repzo_total =
      repzo_taxs === null || repzo_taxs === void 0 ? void 0 : repzo_taxs.length;
    for (let i = 0; i < qb_taxs.QueryResponse.TaxRate.length; i++) {
      const tax = qb_taxs.QueryResponse.TaxRate[i];
      let existTax = repzo_taxs.find(
        (i) => {
          var _a;
          return (
            ((_a = i.integration_meta) === null || _a === void 0
              ? void 0
              : _a.id) === `${company_namespace}_${tax.Id}`
          );
        }
        // i.integration_meta?.quickBooks_id === tax.Id,
      );
      if (existTax) {
        if (
          new Date(
            (_f =
              existTax === null || existTax === void 0
                ? void 0
                : existTax.integration_meta) === null || _f === void 0
              ? void 0
              : _f.QuickBooks_last_sync
          ) <
            new Date(
              (_g = tax.MetaData) === null || _g === void 0
                ? void 0
                : _g.LastUpdatedTime
            ) ||
          (existTax === null || existTax === void 0
            ? void 0
            : existTax.rate) !==
            Number(tax.RateValue) / 100
        ) {
          let repzo_tax = map_taxs(tax, company_namespace);
          try {
            result.updated++;
            await repzo.tax.update(existTax._id, repzo_tax);
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "update",
              doc_id: existTax._id,
              doc: repzo_tax,
              error_message: set_error(e),
            });
          }
        }
      } else {
        //create a new  repzo client
        let repzo_tax = map_taxs(tax, company_namespace);
        try {
          result.created++;
          await repzo.tax.create(repzo_tax);
        } catch (e) {
          result.failed++;
          failed_docs_report.push({
            method: "create",
            doc: repzo_tax,
            error_message: set_error(e),
          });
        }
      }
      // end async calls
      await commandLog
        .addDetail(`✅  Complete Sync Taxes`)
        .setStatus(
          "success",
          failed_docs_report.length ? failed_docs_report : null
        )
        .setBody(result)
        .commit();
    }
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
const map_taxs = (tax, company_namespace) => {
  return {
    name: tax.Name,
    rate: Number(tax.RateValue) / 100,
    type: "inclusive",
    disabled: !tax.Active,
    integration_meta: {
      id: company_namespace + "_" + tax.Id,
      quickBooks_id: tax.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
