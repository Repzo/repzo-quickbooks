import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_payment = async (event, options) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  const repzo = new Repzo(
    (_a = options.data) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    { env: options.env }
  );
  const action_sync_id =
    ((_b = event === null || event === void 0 ? void 0 : event.headers) ===
      null || _b === void 0
      ? void 0
      : _b.action_sync_id) || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body;
  try {
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken:
        ((_c = event.oauth2_data) === null || _c === void 0
          ? void 0
          : _c.access_token) || "",
      realmId:
        ((_d = event.oauth2_data) === null || _d === void 0
          ? void 0
          : _d.realmId) || "",
      sandbox: options.env === "production" ? false : true,
    });
    await actionLog.load(action_sync_id);
    body = event.body;
    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}
    // valid quickbooks client id repzo_invoice
    const repzo_payment = body;
    const repzo_client = await repzo.client.get(
      repzo_payment === null || repzo_payment === void 0
        ? void 0
        : repzo_payment.client_id
    );
    if (
      !((_e =
        repzo_client === null || repzo_client === void 0
          ? void 0
          : repzo_client.integration_meta) === null || _e === void 0
        ? void 0
        : _e.id)
    )
      throw `⛔ Error : Client '${
        repzo_payment === null || repzo_payment === void 0
          ? void 0
          : repzo_payment.client_name
      }' with _id: ${
        repzo_payment === null || repzo_payment === void 0
          ? void 0
          : repzo_payment.client_id
      } missed QuickBooks integration id`;
    let quickBooks_invoice_id;
    if (
      (repzo_payment === null || repzo_payment === void 0
        ? void 0
        : repzo_payment.LinkedTxn) &&
      (repzo_payment === null || repzo_payment === void 0
        ? void 0
        : repzo_payment.LinkedTxn.TxnType) == "invoice"
    ) {
      const invoice_serial_number =
        repzo_payment.LinkedTxn.Txn_serial_number.formatted;
      const repzo_invoices = await repzo.invoice.find({
        "serial_number.formatted": invoice_serial_number,
      });
      if (
        ((_f =
          repzo_invoices === null || repzo_invoices === void 0
            ? void 0
            : repzo_invoices.data) === null || _f === void 0
          ? void 0
          : _f.length) == 1
      ) {
        quickBooks_invoice_id =
          (_g = repzo_invoices.data[0].integration_meta) === null ||
          _g === void 0
            ? void 0
            : _g.quickBooks_id;
      }
      if (!quickBooks_invoice_id) {
        const query = `select * from invoice where DocNumber = '${invoice_serial_number}'`;
        const qb_invoices = await qbo.invoice.find({ query });
        if (
          (_h = qb_invoices.QueryResponse.Invoice) === null || _h === void 0
            ? void 0
            : _h.length
        ) {
          quickBooks_invoice_id = qb_invoices.QueryResponse.Invoice[0].Id;
        }
      }
    }
    // const invoice_id = repzo_payment?.paymentsData?.payments[0]?.fullinvoice_id;
    // if (!invoice_id) {
    //   let error = `⛔ Error : Invalid fullinvoice_id`;
    //   await actionLog.addDetail(error).commit();
    //   throw new Error(error);
    // }
    // const repzo_invoice = await repzo.invoice.get(invoice_id);
    // await actionLog
    //   .addDetail(
    //     `⌛ Connecting to invoice ${repzo_invoice.integration_meta?.DocNumber}`,
    //   )
    //   .commit();
    // let quickBooks_invoice_id = repzo_invoice.integration_meta?.quickBooks_id;
    // if (!quickBooks_invoice_id) {
    //   let error = `⛔ Error : Invalid integration_meta.quickBooks_id`;
    //   await actionLog.addDetail(error).commit();
    //   throw new Error(error);
    // }
    const quickbooks_payment = {
      DocNumber: repzo_payment.serial_number.formatted,
      CurrencyRef: { name: "", value: repzo_payment.currency },
      CustomerRef: {
        name: repzo_client.name,
        value:
          (_j = repzo_client.integration_meta) === null || _j === void 0
            ? void 0
            : _j.quickBooks_id,
      },
      PrivateNote: `invoice ${quickBooks_invoice_id}`,
      TotalAmt: repzo_payment.amount / 1000,
    };
    await actionLog
      .addDetail(
        `QB Payment Body - ${repzo_payment.serial_number.formatted}`,
        quickbooks_payment
      )
      .commit();
    const payment = await qbo.payment.create(quickbooks_payment);
    await actionLog
      .addDetail(`✅ Complete Repzo-Quickbooks: create a new payment`)
      .setStatus("success")
      .setBody(payment)
      .commit();
    // log status
  } catch (e) {
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
