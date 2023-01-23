import Repzo from "repzo";
export const join = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
  const repzo = new Repzo(
    (_a = commandEvent.app.formData) === null || _a === void 0
      ? void 0
      : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  try {
    await commandLog.load(commandEvent.sync_id);
    await commandLog.addDetail("⌛ Repzo QuickBooks: Join").commit();
    const body = {
      data: [
        // invoice
        {
          app: "repzo-quickbooks",
          app_id:
            (_b =
              commandEvent === null || commandEvent === void 0
                ? void 0
                : commandEvent.app) === null || _b === void 0
              ? void 0
              : _b._id,
          action: "create_invoice",
          event: "invoiceItems.create",
          join:
            ((_e =
              (_d =
                (_c =
                  commandEvent === null || commandEvent === void 0
                    ? void 0
                    : commandEvent.app) === null || _c === void 0
                  ? void 0
                  : _c.formData) === null || _d === void 0
                ? void 0
                : _d.Invoices) === null || _e === void 0
              ? void 0
              : _e.createInvoiceHook) || false,
        },
        // client
        {
          app: "repzo-quickbooks",
          app_id:
            (_f =
              commandEvent === null || commandEvent === void 0
                ? void 0
                : commandEvent.app) === null || _f === void 0
              ? void 0
              : _f._id,
          action: "create_customer",
          event: "client.create",
          join:
            ((_j =
              (_h =
                (_g =
                  commandEvent === null || commandEvent === void 0
                    ? void 0
                    : commandEvent.app) === null || _g === void 0
                  ? void 0
                  : _g.formData) === null || _h === void 0
                ? void 0
                : _h.Customers) === null || _j === void 0
              ? void 0
              : _j.createClientHook) || false,
        },
        // payment
        {
          app: "repzo-quickbooks",
          app_id:
            (_k =
              commandEvent === null || commandEvent === void 0
                ? void 0
                : commandEvent.app) === null || _k === void 0
              ? void 0
              : _k._id,
          action: "create_payment",
          event: "payment.create",
          join:
            ((_o =
              (_m =
                (_l =
                  commandEvent === null || commandEvent === void 0
                    ? void 0
                    : commandEvent.app) === null || _l === void 0
                  ? void 0
                  : _l.formData) === null || _m === void 0
                ? void 0
                : _m.Payments) === null || _o === void 0
              ? void 0
              : _o.createPaymentHook) || false,
        },
      ],
    };
    const result = await repzo.joinActionsWebHook.update(null, body);
    await commandLog.setStatus("success").setBody(result).commit();
  } catch (e) {
    //@ts-ignore
    console.error(
      ((_p = e === null || e === void 0 ? void 0 : e.response) === null ||
      _p === void 0
        ? void 0
        : _p.data) || e
    );
    await commandLog.setStatus("fail", e).commit();
    throw e;
  }
};
