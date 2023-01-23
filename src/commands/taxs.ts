import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { TaxRate } from "../quickbooks/types/TaxRate";
import { set_error } from "../util.js";

const bench_time_key = "bench_time_taxs";
export const taxs = async (commandEvent: CommandEvent): Promise<Result> => {
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
  let result: Result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report: FailedDocsReport = [];

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

    result.quickBooks_total = qb_taxs.QueryResponse?.TaxRate?.length;
    result.repzo_total = repzo_taxs?.length;

    for (let i = 0; i < qb_taxs.QueryResponse.TaxRate.length; i++) {
      const tax = qb_taxs.QueryResponse.TaxRate[i];
      let existTax = repzo_taxs.find(
        (i) => i.integration_meta?.id === `${company_namespace}_${tax.Id}`
        // i.integration_meta?.quickBooks_id === tax.Id,
      );
      if (existTax) {
        if (
          new Date(existTax?.integration_meta?.QuickBooks_last_sync) <
            new Date(tax.MetaData?.LastUpdatedTime) ||
          existTax?.rate !== Number(tax.RateValue) / 100
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

const get_all_repzo_taxs = async (
  repzo: Repzo
): Promise<Service.Tax.Get.Result[]> => {
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

const get_all_QuickBooks_taxs = async (
  qb: QuickBooks
): Promise<TaxRate.Find.Result> => {
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

const map_taxs = (
  tax: TaxRate.TaxRateObject,
  company_namespace: string
): Service.Tax.Create.Body => {
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
