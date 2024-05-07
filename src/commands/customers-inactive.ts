import { CommandEvent, Result, FailedDocsReport } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/Customer";
import QuickBooks from "../quickbooks/index.js";
import { set_error, update_bench_time, paginate_max_result } from "../util.js";

const bench_time_key = "bench_time_disabled_client";

/**
 * Event To Sync Inactive Quickbooks Customers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const inactive_customers = async (
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
    await commandLog.addDetail("⌛ Syncing Inactive Clients ......").commit();
    // if (!commandEvent.app?.options_formData[bench_time_key]) {
    //   await commandLog
    //     .addDetail("❌  Failed in : bench_time_disabled_client undefined")
    //     .commit();
    // }

    await commandLog
      .addDetail(
        `Syncing Inactive Clients since ${
          commandEvent.app?.options_formData?.[bench_time_key] || "ever"
        }`
      )
      .commit();

    const sync: string[] = [];

    // return inactive quickbooks clients
    const qb_customers = await get_inactive_QuickBooks_customers(
      qbo,
      commandEvent.app.formData?.bench_time_disabled_client
    );
    result.quickBooks_total = qb_customers.length;

    const customers_integration_meta_ids: string[] = qb_customers.map(
      (customer) => company_namespace + "_" + customer.Id
    );
    // return repzo active clients
    const repzo_active_client = await get_active_repzo_clients(
      repzo,
      customers_integration_meta_ids
    );
    result.repzo_total = repzo_active_client?.length;

    for (let i = 0; i < qb_customers.length; i++) {
      const customer = qb_customers[i];
      if (customer.Active) continue;

      const repzo_client = repzo_active_client.find(
        (i) => i.integration_meta?.id === `${company_namespace}_${customer.Id}`
      );

      if (repzo_client) {
        try {
          sync.push(repzo_client.name);
          await repzo.client.remove(repzo_client._id);
          result.updated++;
        } catch (e) {
          result.failed++;
          failed_docs_report.push({
            method: "update",
            doc_id: repzo_client._id,
            doc: repzo_client,
            error_message: set_error(e),
          });
        }
      }
    }

    await update_bench_time(
      repzo,
      commandEvent.app._id,
      bench_time_key,
      new_bench_time
    );

    await commandLog
      .addDetail(`✅  Complete Sync Inactive Clients`, sync)
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
 * Get Active Repzo Clients
 * @param repzo
 * @returns
 */
const get_active_repzo_clients = async (
  repzo: Repzo,
  customers_integration_meta_ids: string[]
): Promise<
  Pick<
    Service.Client.Find.Result["data"][0],
    "_id" | "name" | "disabled" | "integration_meta"
  >[]
> => {
  try {
    const result = await repzo.client.find({
      "integration_meta.id": customers_integration_meta_ids,
      disabled: false,
      per_page: 50000,
    });

    const repzo_clients: Pick<
      Service.Client.Find.Result["data"][0],
      "_id" | "name" | "disabled" | "integration_meta"
    >[] = result.data.map((doc) => {
      return {
        _id: doc._id,
        name: doc.name,
        disabled: doc.disabled,
        integration_meta: doc.integration_meta,
      };
    });

    return repzo_clients;
  } catch (err) {
    throw err;
  }
};

/**
 * Get All Quickbooks Customers
 * @param qb
 * @param bench_time_disabled_client
 * @returns
 */
const get_inactive_QuickBooks_customers = async (
  qb: QuickBooks,
  bench_time_disabled_client: string
): Promise<Customer.CustomerObject[]> => {
  try {
    let query = "select * from Customer where Active = false ORDER BY Id";
    if (bench_time_disabled_client)
      query = `select * from Customer where Active = false & Metadata.LastUpdatedTime > '${bench_time_disabled_client}' ORDER BY Id`;

    const qb_Clients: Customer.CustomerObject[] = [];

    for (let i = 0; i < 30; i++) {
      const result = await qb.customer.query({
        query:
          query +
          ` STARTPOSITION ${
            i * paginate_max_result
          } MAXRESULTS ${paginate_max_result}`,
      });
      qb_Clients.push(...result.QueryResponse.Customer);
      if (
        !result?.QueryResponse?.Customer?.length ||
        result?.QueryResponse?.Customer?.length < paginate_max_result
      )
        break;
    }

    return qb_Clients;
  } catch (err) {
    throw err;
  }
};
