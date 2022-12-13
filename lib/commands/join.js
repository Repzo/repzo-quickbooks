import Repzo from "repzo";
export const join = async (commandEvent) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const repzo = new Repzo((_a = commandEvent.app.formData) === null || _a === void 0 ? void 0 : _a.repzoApiKey, {
        env: commandEvent.env,
    });
    const commandLog = new Repzo.CommandLog(repzo, commandEvent.app, commandEvent.command);
    try {
        await commandLog.load(commandEvent.sync_id);
        await commandLog.addDetail("⌛ Repzo QuickBooks: Join").commit();
        const body = {
            data: [
                // invoice
                {
                    app: "repzo-quickbooks",
                    action: "create_invoice",
                    event: "invoiceItems.create",
                    join: ((_d = (_c = (_b = commandEvent === null || commandEvent === void 0 ? void 0 : commandEvent.app) === null || _b === void 0 ? void 0 : _b.formData) === null || _c === void 0 ? void 0 : _c.Invoices) === null || _d === void 0 ? void 0 : _d.createInvoiceHook) || false,
                },
                // client
                {
                    app: "repzo-quickbooks",
                    action: "create_customer",
                    event: "client.create",
                    join: ((_g = (_f = (_e = commandEvent === null || commandEvent === void 0 ? void 0 : commandEvent.app) === null || _e === void 0 ? void 0 : _e.formData) === null || _f === void 0 ? void 0 : _f.Customers) === null || _g === void 0 ? void 0 : _g.createClientHook) || false,
                },
                // payment
                {
                    app: "repzo-quickbooks",
                    action: "create_payment",
                    event: "payment.create",
                    join: ((_k = (_j = (_h = commandEvent === null || commandEvent === void 0 ? void 0 : commandEvent.app) === null || _h === void 0 ? void 0 : _h.formData) === null || _j === void 0 ? void 0 : _j.Payments) === null || _k === void 0 ? void 0 : _k.createPaymentHook) || false,
                },
            ],
        };
        const result = await repzo.joinActionsWebHook.update(null, body);
        await commandLog.setStatus("success").setBody(result).commit();
    }
    catch (e) {
        //@ts-ignore
        console.error(((_l = e === null || e === void 0 ? void 0 : e.response) === null || _l === void 0 ? void 0 : _l.data) || e);
        await commandLog.setStatus("fail", e).commit();
        throw e;
    }
};
