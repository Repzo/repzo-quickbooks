import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
var result = {
  QuickBooks_total: 0,
  repzo_total: 0,
  created: 0,
  updated: 0,
  failed: 0,
};
export const customers = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g;
  // init Repzo object
  const repzo = new Repzo(
    (_a = commandEvent.app.formData) === null || _a === void 0
      ? void 0
      : _a.repzoApiKey,
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
      (_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token,
    realmId:
      (_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    // init Repzo object
    const repzo = new Repzo(
      (_d = commandEvent.app.formData) === null || _d === void 0
        ? void 0
        : _d.repzoApiKey,
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
        ((_e = commandEvent.oauth2_data) === null || _e === void 0
          ? void 0
          : _e.access_token) || "",
      realmId:
        ((_f = commandEvent.oauth2_data) === null || _f === void 0
          ? void 0
          : _f.realmId) || "",
      sandbox: true,
    });
    // sync_customers_from_QuickBooks_to_repzo
    let res = await sync_customers_from_QuickBooks_to_repzo(
      repzo,
      qbo,
      (_g = commandEvent.app.formData) === null || _g === void 0
        ? void 0
        : _g.bench_time_client
    );
    await commandLog
      .setStatus("success")
      .setBody(
        "Complete Sync QuickBooks custommers to Repzo ," + JSON.stringify(res)
      )
      .commit();
    return res;
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();
    return result;
  }
};
const sync_customers_from_QuickBooks_to_repzo = async (
  repzo,
  qb,
  bench_time_client
) => {
  var _a;
  try {
    let repzo_client = await get_all_repzo_clients(repzo);
    const qb_customers = await get_all_QuickBooks_customers(
      qb,
      bench_time_client
    );
    repzo_client = repzo_client.filter((i) => {
      var _a;
      return (
        ((_a = i.integration_meta) === null || _a === void 0
          ? void 0
          : _a.QuickBooks_id) !== undefined
      );
    });
    (_a = qb_customers.QueryResponse.Customer) === null || _a === void 0
      ? void 0
      : _a.forEach(async (cutomer) => {
          var _a, _b, _c;
          let existClient = repzo_client.filter((i) => {
            var _a;
            return (
              ((_a = i.integration_meta) === null || _a === void 0
                ? void 0
                : _a.QuickBooks_id) === cutomer.Id ||
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
              try {
                console.log(
                  `update repzo client id -- ${existClient[0]._id} ...`
                );
                let repzo_client = map_customers(cutomer);
                await repzo.client.update(existClient[0]._id, repzo_client);
                result["updated"] = result["updated"] + 1 || 1;
              } catch (err) {
                console.error(err);
                result["failed"] = result["failed"] + 1 || 1;
              }
            }
          } else {
            //create a new  repzo client
            try {
              let repzo_client = map_customers(cutomer);
              await repzo.client.create({
                client_code: `QB_${cutomer.Id}`,
                ...repzo_client,
              });
              result["created"] = result["created"] + 1 || 1;
            } catch (err) {
              console.error(err);
              result["failed"] = result["failed"] + 1 || 1;
            }
          }
        });
  } catch (err) {
    console.error(err);
  }
  return result;
};
const sync_customers_from_repzo_to_QuickBooks = async (
  QuickBooks_customers,
  repzo_client
) => {};
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
    console.error(err);
    return [];
  }
};
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
      QuickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};