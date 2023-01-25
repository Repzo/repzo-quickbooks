import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/Customer";
import QuickBooks from "../quickbooks/index.js";
import { set_error, update_bench_time } from "../util.js";

const bench_time_key = "bench_time_client";

/**
 * Event To Sync Quickbooks Customers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const customers = async (
  commandEvent: CommandEvent
): Promise<Result> => {
  // init Repzo object
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });

  const company_namespace = commandEvent.nameSpace.join("_");

  let result: Result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report: FailedDocsReport = [];
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  try {
    const new_bench_time = new Date().toISOString();
    // init commandLog

    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: commandEvent.oauth2_data?.access_token || "",
      realmId: commandEvent.oauth2_data?.realmId || "",
      sandbox: commandEvent.env === "production" ? false : true,
    });
    await commandLog.load(commandEvent.sync_id);
    await commandLog.addDetail("⌛ Syncing Clients ......").commit();
    // if (!commandEvent.app?.options_formData[bench_time_key]) {
    //   await commandLog
    //     .addDetail("❌  Failed in : bench_time_client undefined")
    //     .commit();
    // }

    await commandLog
      .addDetail(
        `Syncing Clients since ${
          commandEvent.app?.options_formData?.[bench_time_key] || "ever"
        }`
      )
      .commit();

    // return all repzo clients
    let repzo_client = await get_all_repzo_clients(repzo);

    // return all quickbooks clients
    const qb_customers = await get_all_QuickBooks_customers(
      qbo,
      commandEvent.app.formData?.bench_time_client
    );

    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.id !== undefined // i.integration_meta?.quickBooks_id !== undefined,
    );

    result.repzo_total = repzo_client.length;
    result.quickBooks_total = qb_customers.QueryResponse.Customer.length;

    for (let i = 0; i < qb_customers.QueryResponse.Customer.length; i++) {
      const cutomer = qb_customers.QueryResponse.Customer[i];
      try {
        let existClient = repzo_client.find(
          (i) => i.integration_meta?.id === `${company_namespace}_${cutomer.Id}`
          // i.integration_meta?.quickBooks_id === cutomer.Id || i.client_code === `QB_${cutomer.Id}`,
        );
        if (existClient) {
          if (
            new Date(existClient?.integration_meta?.QuickBooks_last_sync) <
            new Date(cutomer.MetaData?.LastUpdatedTime)
          ) {
            let repzo_client = map_customers(cutomer, company_namespace);
            try {
              result.updated++;
              await repzo.client.update(existClient._id, repzo_client);
            } catch (e) {
              result.failed++;
              failed_docs_report.push({
                method: "update",
                doc_id: existClient._id,
                doc: repzo_client,
                error_message: set_error(e),
              });
            }
          }
        } else {
          let repzo_client = map_customers(cutomer, company_namespace);
          try {
            result.created++;
            repzo_client.client_code = `QB_${cutomer.Id}`;
            await repzo.client.create(repzo_client);
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "create",
              doc: repzo_client,
              error_message: set_error(e),
            });
          }
        }
      } catch (e) {
        result.failed++;
        failed_docs_report.push({
          method: "fetchingData",
          error_message: set_error(e),
        });
      }
    }

    await update_bench_time(
      repzo,
      commandEvent.app._id,
      bench_time_key,
      new_bench_time
    );

    await commandLog
      .addDetail(`✅  Complete Sync Clients`)
      .setStatus(
        "success",
        failed_docs_report.length ? failed_docs_report : null
      )
      .setBody(result)
      .commit();
  } catch (e) {
    await commandLog.setStatus("fail", e).setBody(e).commit();
  } finally {
    return result;
  }
};

/**
 * Get All Repzo Clients
 * @param repzo
 * @returns
 */
const get_all_repzo_clients = async (
  repzo: Repzo
): Promise<Service.Client.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_clients: any[];
    repzo_clients = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.client.find({
        page: 1,
        per_page,
        disabled: false,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_clients = [...repzo_clients, ...repzoObj.data];
    }
    return repzo_clients;
  } catch (err) {
    throw err;
  }
};

/**
 * Get All Quickbooks Customers
 * @param qb
 * @param bench_time_client
 * @returns
 */
const get_all_QuickBooks_customers = async (
  qb: QuickBooks,
  bench_time_client: string
): Promise<Customer.Find.Result> => {
  try {
    let query = "select * from Customer";
    if (bench_time_client)
      query = `select * from Customer Where Metadata.LastUpdatedTime > '${bench_time_client}'`;
    const qb_Clients = await qb.customer.query({
      query,
    });
    return qb_Clients;
  } catch (err) {
    throw err;
  }
};

/**
 * Map Custommer object with Client
 * @param cutomer
 * @returns
 */
const map_customers = (
  cutomer: Customer.CustomerObject,
  company_namespace: string
): Service.Client.Create.Body => {
  return {
    name: cutomer.DisplayName,
    disabled: !cutomer.Active,
    contact_title: cutomer.GivenName,
    country: cutomer.BillAddr?.CountrySubDivisionCode,
    city: cutomer.BillAddr?.City,
    lat: !isNaN(Number(cutomer.BillAddr?.Lat))
      ? Number(cutomer.BillAddr?.Lat)
      : 0.0,
    lng: !isNaN(Number(cutomer.BillAddr?.Long))
      ? Number(cutomer.BillAddr?.Long)
      : 0.0,
    integrated_client_balance: Number(cutomer.Balance) * 1000,
    cell_phone: cutomer.PrimaryPhone?.FreeFormNumber,
    email: cutomer.PrimaryEmailAddr?.Address,
    integration_meta: {
      id: company_namespace + "_" + cutomer.Id,
      quickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
