import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/item";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { TaxRate } from "../quickbooks/types/taxRate";

// const new_bench_time = new Date().toISOString();
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
    oauthToken: commandEvent.oauth2_data?.access_token,
    realmId: commandEvent.oauth2_data?.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });

  let result: Result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };

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

    Promise.all(promisify(qb_taxs, repzo_taxs, repzo))
      .then((values) => {
        result.sync = values.length;
        commandLog
          .addDetail(
            `Complete : Sync ${values.length} Item / Product with Quickbooks ,and bench_time  ${commandEvent.app.options_formData[bench_time_key]}`
          )
          .setBody(result)
          .commit();
      })
      .catch((err) => {
        console.error(`failed to complete sync due to an exception : ${err}`);
        commandLog
          .setStatus("fail", "failed to complete sync due to an exception")
          .setBody(result)
          .commit();
      });
  } catch (err) {
    await commandLog
      .setStatus("fail", "failed to complete sync due to an exception")
      .setBody(result)
      .commit();
  }
  return result;
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

    const qb_taxs = await qb.taxRate.query({
      query,
    });
    return qb_taxs;
  } catch (err) {
    throw err;
  }
};

const promisify = (
  qb_taxs: TaxRate.Find.Result,
  repzo_taxs: Service.Tax.Get.Result[],
  repzo: Repzo
): any[] => {
  let jobs: any[] = []; // save all jobs here
  qb_taxs.QueryResponse.TaxRate.forEach((tax, index, array) => {
    let existTax = repzo_taxs.filter(
      (i) => i.integration_meta?.QuickBooks_id === tax.Id
    );
    if (existTax[0]) {
      if (
        new Date(existTax[0]?.integration_meta?.QuickBooks_last_sync) <
        new Date(tax.MetaData?.LastUpdatedTime)
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

const map_taxs = (tax: TaxRate.TaxRateObject): Service.Tax.Create.Body => {
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
