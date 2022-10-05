import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import _test from "../tests/forms/token_example.js";
export const products = async (commandEvent) => {
  var _a;
  try {
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
      oauthToken: _test.access_token,
      realmId: _test.realmId,
      sandbox: true,
    });
    const new_bench_time = new Date().toISOString();
    // sync_products_from_QuickBooks_to_repzo
    await sync_products_from_QuickBooks_to_repzo(repzo, qbo, "2015-03-01");
    await commandLog
      .setStatus("success")
      .setBody("Complete Sync QuickBooks custommers to Repzo")
      .commit();
  } catch (err) {
    console.error(err);
  }
};
const sync_products_from_QuickBooks_to_repzo = async (
  repzo,
  qb,
  bench_time_client
) => {
  try {
    let repzo_client = await get_all_repzo_clients(repzo);
    const qb_products = await get_all_QuickBooks_products(
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
    qb_products.QueryResponse.Customer.forEach(async (cutomer) => {
      var _a, _b;
      let existClient = repzo_client.filter((i) => {
        var _a;
        return (
          ((_a = i.integration_meta) === null || _a === void 0
            ? void 0
            : _a.QuickBooks_id) === cutomer.Id ||
          i.client_code === `QB_${cutomer.Id}`
        );
      });
      if (
        ((_b =
          (_a = existClient[0]) === null || _a === void 0
            ? void 0
            : _a.integration_meta) === null || _b === void 0
          ? void 0
          : _b.QuickBooks_last_sync) > cutomer.MetaData.LastUpdatedTime
      ) {
        try {
          console.log(`update repzo client id -- ${existClient[0]._id} ...`);
          let repzo_client = map_products(cutomer);
          await repzo.client.update(existClient[0]._id, repzo_client);
        } catch (err) {
          console.error(err);
        }
      } else {
        //create a new  repzo client
        try {
          console.log(
            `create a new repzo client name -- ${cutomer.GivenName} ...`
          );
          let repzo_client = map_products(cutomer);
          await repzo.client.create({
            client_code: `QB_${cutomer.Id}`,
            ...repzo_client,
          });
        } catch (err) {
          console.error(err);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
};
const sync_products_from_repzo_to_QuickBooks = async (
  QuickBooks_products,
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
const get_all_QuickBooks_products = async (qb, bench_time_client) => {
  try {
    const qb_Clients = await qb.customer.query({
      query: `select * from Customer Where Metadata.LastUpdatedTime > '${bench_time_client}'`,
    });
    return qb_Clients;
  } catch (err) {
    throw err;
  }
};
const map_products = (cutomer) => {
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
