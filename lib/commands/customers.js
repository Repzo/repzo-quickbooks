import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { set_error, update_bench_time, paginate_max_result } from "../util.js";
const bench_time_key = "bench_time_client";
/**
 * Event To Sync Quickbooks Customers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const customers = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  // init Repzo object
  const repzo = new Repzo(
    (_a = commandEvent.app.formData) === null || _a === void 0
      ? void 0
      : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  const company_namespace = commandEvent.nameSpace.join("_");
  let result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report = [];
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
          ((_e =
            (_d = commandEvent.app) === null || _d === void 0
              ? void 0
              : _d.options_formData) === null || _e === void 0
            ? void 0
            : _e[bench_time_key]) || "ever"
        }`
      )
      .commit();
    // return all repzo clients
    let repzo_client = await get_all_repzo_clients(repzo);
    // return all quickbooks clients
    const qb_customers = await get_all_QuickBooks_customers(
      qbo,
      (_f = commandEvent.app.formData) === null || _f === void 0
        ? void 0
        : _f.bench_time_client
    );
    repzo_client = repzo_client.filter(
      (i) => {
        var _a;
        return (
          ((_a = i.integration_meta) === null || _a === void 0
            ? void 0
            : _a.id) !== undefined
        );
      } // i.integration_meta?.quickBooks_id !== undefined,
    );
    result.repzo_total = repzo_client.length;
    result.quickBooks_total = qb_customers.length;
    for (let i = 0; i < qb_customers.length; i++) {
      const cutomer = qb_customers[i];
      try {
        let existClient = repzo_client.find(
          (i) => {
            var _a;
            return (
              ((_a = i.integration_meta) === null || _a === void 0
                ? void 0
                : _a.id) === `${company_namespace}_${cutomer.Id}`
            );
          }
          // i.integration_meta?.quickBooks_id === cutomer.Id || i.client_code === `QB_${cutomer.Id}`,
        );
        if (existClient) {
          if (
            new Date(
              (_g =
                existClient === null || existClient === void 0
                  ? void 0
                  : existClient.integration_meta) === null || _g === void 0
                ? void 0
                : _g.QuickBooks_last_sync
            ) <
            new Date(
              (_h = cutomer.MetaData) === null || _h === void 0
                ? void 0
                : _h.LastUpdatedTime
            )
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
const get_all_repzo_clients = async (repzo) => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_clients;
    repzo_clients = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.client.find({
        page: 1,
        per_page,
        // disabled: false,
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
const get_all_QuickBooks_customers = async (qb, bench_time_client) => {
  var _a, _b, _c, _d;
  try {
    let query = "select * from Customer ORDER BY Id";
    if (bench_time_client)
      query = `select * from Customer Where Metadata.LastUpdatedTime > '${bench_time_client}' ORDER BY Id`;
    const qb_Clients = [];
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
        !((_b =
          (_a =
            result === null || result === void 0
              ? void 0
              : result.QueryResponse) === null || _a === void 0
            ? void 0
            : _a.Customer) === null || _b === void 0
          ? void 0
          : _b.length) ||
        ((_d =
          (_c =
            result === null || result === void 0
              ? void 0
              : result.QueryResponse) === null || _c === void 0
            ? void 0
            : _c.Customer) === null || _d === void 0
          ? void 0
          : _d.length) < paginate_max_result
      )
        break;
    }
    return qb_Clients;
  } catch (err) {
    throw err;
  }
};
/**
 * Map Customer object with Client
 * @param cutomer
 * @returns
 */
const map_customers = (cutomer, company_namespace) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  return {
    name: cutomer.DisplayName,
    disabled: !cutomer.Active,
    contact_title: cutomer.GivenName,
    country:
      (_a = cutomer.BillAddr) === null || _a === void 0
        ? void 0
        : _a.CountrySubDivisionCode,
    city: (_b = cutomer.BillAddr) === null || _b === void 0 ? void 0 : _b.City,
    formatted_address:
      (_c = cutomer.BillAddr) === null || _c === void 0 ? void 0 : _c.Line1,
    lat: !isNaN(
      Number(
        (_d = cutomer.BillAddr) === null || _d === void 0 ? void 0 : _d.Lat
      )
    )
      ? Number(
          (_e = cutomer.BillAddr) === null || _e === void 0 ? void 0 : _e.Lat
        )
      : 0.0,
    lng: !isNaN(
      Number(
        (_f = cutomer.BillAddr) === null || _f === void 0 ? void 0 : _f.Long
      )
    )
      ? Number(
          (_g = cutomer.BillAddr) === null || _g === void 0 ? void 0 : _g.Long
        )
      : 0.0,
    integrated_client_balance: Number(cutomer.Balance) * 1000,
    cell_phone:
      (_h = cutomer.PrimaryPhone) === null || _h === void 0
        ? void 0
        : _h.FreeFormNumber,
    email:
      (_j = cutomer.PrimaryEmailAddr) === null || _j === void 0
        ? void 0
        : _j.Address,
    integration_meta: {
      id: company_namespace + "_" + cutomer.Id,
      quickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
