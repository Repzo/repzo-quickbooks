import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_customer = async (event, options) => {
    var _a, _b, _c;
    const repzo = new Repzo((_a = options.data) === null || _a === void 0 ? void 0 : _a.repzoApiKey, { env: options.env });
    const action_sync_id = ((_b = event === null || event === void 0 ? void 0 : event.headers) === null || _b === void 0 ? void 0 : _b.action_sync_id) || uuid();
    const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
    let body;
    try {
        // init QuickBooks object
        const qbo = new QuickBooks({
            oauthToken: options.oauth2_data.access_token,
            realmId: options.oauth2_data.realmId,
            sandbox: options.env === "production" ? false : true,
        });
        // console.log("create_customer");
        await actionLog.load(action_sync_id);
        body = event.body;
        try {
            if (body)
                body = JSON.parse(body);
        }
        catch (e) { }
        await actionLog
            .addDetail(`Repzo QuickBooks: Started Create Client - ${(_c = body === null || body === void 0 ? void 0 : body.serial_number) === null || _c === void 0 ? void 0 : _c.formatted}`)
            .commit();
        const repzo_client = body;
        const QB_customer_body = {
            FullyQualifiedName: repzo_client.name,
            PrimaryEmailAddr: {
                Address: repzo_client.email ? repzo_client.email : "",
            },
            DisplayName: repzo_client.name,
            Suffix: "Jr",
            Title: "Mr",
            MiddleName: repzo_client.name,
            FamilyName: repzo_client.name,
            PrimaryPhone: {
                FreeFormNumber: repzo_client.phone ? repzo_client.phone : "",
            },
            CompanyName: repzo_client.company_namespace[0],
            BillAddr: {
                City: repzo_client.city ? repzo_client.city : "",
                Country: repzo_client.country ? repzo_client.country : "",
            },
            GivenName: repzo_client.name,
        };
        await actionLog
            .addDetail(`Repzo Quickbooks: Customer - ${QB_customer_body === null || QB_customer_body === void 0 ? void 0 : QB_customer_body.DisplayName}`, QB_customer_body)
            .commit();
        const result = await qbo.customer.create(QB_customer_body);
        console.log(result);
        await actionLog
            .addDetail(`quickbooks Responded with `, result)
            .setStatus("success")
            .setBody(body)
            .commit();
        return result;
    }
    catch (e) {
        console.error((e === null || e === void 0 ? void 0 : e.response) || e);
        await actionLog.setStatus("fail", e).setBody(body).commit();
        throw e;
    }
};
