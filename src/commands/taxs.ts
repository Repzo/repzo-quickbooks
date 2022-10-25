import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { TaxRate } from "../quickbooks/types/TaxRate";

const bench_time_key = "bench_time_taxs";
export const taxs = async (commandEvent: CommandEvent): Promise<Result> => {
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
    oauthToken: commandEvent.oauth2_data?.access_token || "",
    realmId: commandEvent.oauth2_data?.realmId || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  let result: Result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };

  try {
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("Syncing Taxs ....").commit();

    if (!app.options_formData[bench_time_key]) {
      await commandLog.addDetail("bench_time_taxs undefined").commit();
    }
    // return all repzo taxs
    let qb_taxs = await get_all_QuickBooks_taxs(qbo);

    // return all quickbooks taxs
    let repzo_taxs = await get_all_repzo_taxs(repzo);
    qb_taxs.QueryResponse.TaxRate.forEach(async (tax: any, index, array) => {
      let existTax = repzo_taxs.filter(
        (i) => i.integration_meta?.quickBooks_id === tax.Id
      );
      if (existTax[0]) {
        if (
          new Date(existTax[0]?.integration_meta?.QuickBooks_last_sync) <
            new Date(tax.MetaData?.LastUpdatedTime) ||
          existTax[0]?.rate !== Number(tax.RateValue) / 100
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
          .addDetail(`Complete Sync Taxs`)
          .setStatus("success")
          .setBody(result)
          .commit();
      }
    });
  } catch (err) {
    await commandLog.setStatus("fail", err).setBody(result).commit();
    console.error(err);
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

const map_taxs = (tax: TaxRate.TaxRateObject): Service.Tax.Create.Body => {
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
