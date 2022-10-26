import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
const bench_time_key = "bench_time_client";
/**
 * Event To Sync Quickbooks Custommers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const customers = async (commandEvent) => {
  var _a, _b, _c, _d, _e;
  // init Repzo object
  const repzo = new Repzo(
    (_a = commandEvent.app.formData) === null || _a === void 0
      ? void 0
      : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  let result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  try {
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
    if (
      !((_d = commandEvent.app) === null || _d === void 0
        ? void 0
        : _d.options_formData[bench_time_key])
    ) {
      await commandLog
        .addDetail("❌  Failed in : bench_time_client undefined")
        .commit();
    }
    // return all repzo clients
    let repzo_client = await get_all_repzo_clients(repzo);
    // return all quickbooks clients
    const qb_customers = await get_all_QuickBooks_customers(
      qbo,
      (_e = commandEvent.app.formData) === null || _e === void 0
        ? void 0
        : _e.bench_time_client
    );
    repzo_client = repzo_client.filter((i) => {
      var _a;
      return (
        ((_a = i.integration_meta) === null || _a === void 0
          ? void 0
          : _a.quickBooks_id) !== undefined
      );
    });
    result.repzo_total = repzo_client.length;
    result.quickBooks_total = qb_customers.QueryResponse.Customer.length;
    qb_customers.QueryResponse.Customer.forEach(
      async (cutomer, index, array) => {
        var _a, _b, _c;
        let existClient = repzo_client.filter((i) => {
          var _a;
          return (
            ((_a = i.integration_meta) === null || _a === void 0
              ? void 0
              : _a.quickBooks_id) === cutomer.Id ||
            i.client_code === `QB_${cutomer.Id}`
          );
        });
        if (existClient[0]) {
          if (
            new Date(
              (_b =
                (_a = existClient[0]) === null || _a === void 0
                  ? void 0
                  : _a.integration_meta) === null || _b === void 0
                ? void 0
                : _b.QuickBooks_last_sync
            ) <
            new Date(
              (_c = cutomer.MetaData) === null || _c === void 0
                ? void 0
                : _c.LastUpdatedTime
            )
          ) {
            let repzo_client = map_customers(cutomer);
            try {
              result.updated++;
              await repzo.client.update(existClient[0]._id, repzo_client);
            } catch (e) {
              result.failed++;
            }
          }
        } else {
          let repzo_client = map_customers(cutomer);
          try {
            result.created++;
            await repzo.client.create({
              client_code: `QB_${cutomer.Id}`,
              ...repzo_client,
            });
          } catch (e) {
            result.failed++;
          }
        }
        // end async calls
        if (index === array.length - 1) {
          await commandLog
            .addDetail(`✅  Complete Sync Clients`)
            .setStatus("success")
            .setBody(result)
            .commit();
        }
      }
    );
  } catch (e) {
    console.error(`❌ failed to complete sync due to an exception : ${e}`);
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
const get_all_QuickBooks_customers = async (qb, bench_time_client) => {
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
const map_customers = (cutomer) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return {
    name: cutomer.DisplayName,
    contact_title: cutomer.GivenName,
    country:
      (_a = cutomer.BillAddr) === null || _a === void 0
        ? void 0
        : _a.CountrySubDivisionCode,
    city: (_b = cutomer.BillAddr) === null || _b === void 0 ? void 0 : _b.City,
    lat: !isNaN(
      Number(
        (_c = cutomer.BillAddr) === null || _c === void 0 ? void 0 : _c.Lat
      )
    )
      ? Number(
          (_d = cutomer.BillAddr) === null || _d === void 0 ? void 0 : _d.Lat
        )
      : 0.0,
    lng: !isNaN(
      Number(
        (_e = cutomer.BillAddr) === null || _e === void 0 ? void 0 : _e.Long
      )
    )
      ? Number(
          (_f = cutomer.BillAddr) === null || _f === void 0 ? void 0 : _f.Long
        )
      : 0.0,
    integrated_client_balance: Number(cutomer.Balance) * 1000,
    cell_phone:
      (_g = cutomer.PrimaryPhone) === null || _g === void 0
        ? void 0
        : _g.FreeFormNumber,
    email:
      (_h = cutomer.PrimaryEmailAddr) === null || _h === void 0
        ? void 0
        : _h.Address,
    integration_meta: {
      quickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
