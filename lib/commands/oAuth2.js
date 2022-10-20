import QuickBooks from "../quickbooks/index.js";
/**
 * Event To Sync Quickbooks Custommers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const oAuth2 = async (commandEvent) => {
  // init QuickBooks object
  var _a, _b;
  const qbo = new QuickBooks({
    minorversion: 65,
    intgAppId: commandEvent.app._id || "",
    refreshKey: commandEvent.app.formData.repzoApiKey || "",
    oauthToken:
      ((_a = commandEvent.oauth2_data) === null || _a === void 0
        ? void 0
        : _a.access_token) || "",
    realmId:
      ((_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.realmId) || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    let query = "select * from Customer";
    const qb_Clients = await qbo.customer.query({
      query,
    });
    console.log(qb_Clients);
  } catch (e) {
    console.dir(e, { depth: null });
    //throw new Error(e);
  }
};
