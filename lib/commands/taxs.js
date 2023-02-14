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
    { env: commandEvent.env }
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
    const qb_taxRates = await get_all_QuickBooks_taxRates(qbo);
    const qb_taxCodes = await get_all_QuickBooks_taxCodes(qbo);
    const qb_taxes = qb_taxCodes.QueryResponse.TaxCode.map((taxCode) => {
      var _a, _b, _c, _d;
      const tax = {
        Id: taxCode.Id,
        Name: taxCode.Name,
        Active: taxCode.Active,
        MetaData: taxCode.MetaData,
        RateValue: 0,
      };
      if (
        (_b =
          (_a = taxCode.SalesTaxRateList) === null || _a === void 0
            ? void 0
            : _a.TaxRateDetail) === null || _b === void 0
          ? void 0
          : _b.length
      ) {
        const taxRate =
          (_d =
            (_c = qb_taxRates.QueryResponse) === null || _c === void 0
              ? void 0
              : _c.TaxRate) === null || _d === void 0
            ? void 0
            : _d.find((taxRate) => {
                var _a;
                return (
                  taxRate.Id ==
                  ((_a = taxCode.SalesTaxRateList) === null || _a === void 0
                    ? void 0
                    : _a.TaxRateDetail[0].TaxRateRef.value)
                );
              });
        if (taxRate) {
          tax.RateValue = Number(taxRate.RateValue);
        }
      }
      return tax;
    });
    // return all quickbooks taxes
    let repzo_taxs = await get_all_repzo_taxs(repzo);
    result.quickBooks_total = qb_taxes.length;
    result.repzo_total =
      repzo_taxs === null || repzo_taxs === void 0 ? void 0 : repzo_taxs.length;
    for (let i = 0; i < qb_taxes.length; i++) {
      const tax = qb_taxes[i];
      const existTax_inclusive = repzo_taxs.find(
        (i) => {
          var _a;
          return (
            ((_a = i.integration_meta) === null || _a === void 0
              ? void 0
              : _a.id) === `${company_namespace}_${tax.Id}_inclusive`
          );
        }
        // i.integration_meta?.quickBooks_id === tax.Id,
      );
      const existTax_additive = repzo_taxs.find(
        (i) => {
          var _a;
          return (
            ((_a = i.integration_meta) === null || _a === void 0
              ? void 0
              : _a.id) === `${company_namespace}_${tax.Id}_additive`
          );
        }
        // i.integration_meta?.quickBooks_id === tax.Id,
      );
      if (existTax_inclusive || existTax_additive) {
        if (existTax_inclusive) {
          if (
            new Date(
              (_d =
                existTax_inclusive === null || existTax_inclusive === void 0
                  ? void 0
                  : existTax_inclusive.integration_meta) === null ||
              _d === void 0
                ? void 0
                : _d.QuickBooks_last_sync
            ) <
              new Date(
                (_e = tax.MetaData) === null || _e === void 0
                  ? void 0
                  : _e.LastUpdatedTime
              ) ||
            (existTax_inclusive === null || existTax_inclusive === void 0
              ? void 0
              : existTax_inclusive.rate) !==
              Number(tax.RateValue) / 100
          ) {
            let repzo_tax = map_taxs(tax, company_namespace);
            try {
              result.updated++;
              await repzo.tax.update(
                existTax_inclusive._id,
                repzo_tax.inclusive
              );
            } catch (e) {
              result.failed++;
              failed_docs_report.push({
                method: "update",
                doc_id: existTax_inclusive._id,
                doc: repzo_tax,
                error_message: set_error(e),
              });
            }
          }
        } else {
          let repzo_tax = map_taxs(tax, company_namespace);
          try {
            result.created++;
            await repzo.tax.create(repzo_tax.inclusive);
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "create",
              doc: repzo_tax,
              error_message: set_error(e),
            });
          }
        }
        if (existTax_additive) {
          if (
            new Date(
              (_f =
                existTax_additive === null || existTax_additive === void 0
                  ? void 0
                  : existTax_additive.integration_meta) === null ||
              _f === void 0
                ? void 0
                : _f.QuickBooks_last_sync
            ) <
              new Date(
                (_g = tax.MetaData) === null || _g === void 0
                  ? void 0
                  : _g.LastUpdatedTime
              ) ||
            (existTax_additive === null || existTax_additive === void 0
              ? void 0
              : existTax_additive.rate) !==
              Number(tax.RateValue) / 100
          ) {
            let repzo_tax = map_taxs(tax, company_namespace);
            try {
              result.updated++;
              await repzo.tax.update(existTax_additive._id, repzo_tax.additive);
            } catch (e) {
              result.failed++;
              failed_docs_report.push({
                method: "update",
                doc_id: existTax_additive._id,
                doc: repzo_tax,
                error_message: set_error(e),
              });
            }
          }
        } else {
          let repzo_tax = map_taxs(tax, company_namespace);
          try {
            result.created++;
            await repzo.tax.create(repzo_tax.additive);
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "create",
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
          await repzo.tax.create(repzo_tax.inclusive);
          await repzo.tax.create(repzo_tax.additive);
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
const get_all_QuickBooks_taxRates = async (qb) => {
  try {
    let query = `Select * From TaxRate`;
    const qb_taxRates = await qb.tax.query({ query });
    return qb_taxRates;
  } catch (err) {
    throw err;
  }
};
const get_all_QuickBooks_taxCodes = async (qb) => {
  try {
    let query = `Select * From TaxCode`;
    const qb_taxCodes = await qb.taxCode.query({ query });
    return qb_taxCodes;
  } catch (err) {
    throw err;
  }
};
const map_taxs = (tax, company_namespace) => {
  try {
    const inclusive = {
      name: `${tax.Name} (inclusive)`,
      rate: Number(tax.RateValue) / 100,
      type: "inclusive",
      disabled: !tax.Active,
      integration_meta: {
        id: company_namespace + "_" + tax.Id + "_" + "inclusive",
        type: "inclusive",
        quickBooks_id: tax.Id,
        QuickBooks_last_sync: new Date().toISOString(),
      },
    };
    const additive = {
      name: `${tax.Name} (additive)`,
      rate: Number(tax.RateValue) / 100,
      type: "additive",
      disabled: !tax.Active,
      integration_meta: {
        id: company_namespace + "_" + tax.Id + "_" + "additive",
        type: "additive",
        quickBooks_id: tax.Id,
        QuickBooks_last_sync: new Date().toISOString(),
      },
    };
    return { additive, inclusive };
  } catch (e) {
    throw e;
  }
};
