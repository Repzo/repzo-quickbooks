import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { Service } from "repzo/src/types";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
import { Payment } from "../quickbooks/types/Payment";

export const create_payment = async (event: EVENT, options: Config) => {
  const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
  const action_sync_id: string = event?.headers?.action_sync_id || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body: Service.Client.ClientSchema | any;
  try {
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: event.oauth2_data?.access_token || "",
      realmId: event.oauth2_data?.realmId || "",
      sandbox: options.env === "production" ? false : true,
    });
    await actionLog.load(action_sync_id);
    body = event.body;
    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}
    // valid quickbooks client id repzo_invoice
    const repzo_payment: Service.Payment.PaymentSchema = body;
    const repzo_client = await repzo.client.get(repzo_payment?.client_id);
    if (!repzo_client?.integration_meta?.id)
      throw `⛔ Error : Client '${repzo_payment?.client_name}' with _id: ${repzo_payment?.client_id} missed QuickBooks integration id`;

    let quickBooks_invoice_id;
    if (
      repzo_payment?.LinkedTxn &&
      repzo_payment?.LinkedTxn.TxnType == "invoice"
    ) {
      const invoice_serial_number: string =
        repzo_payment.LinkedTxn.Txn_serial_number.formatted;
      const repzo_invoices = await repzo.invoice.find({
        "serial_number.formatted": invoice_serial_number,
      });
      if (repzo_invoices?.data?.length == 1) {
        quickBooks_invoice_id =
          repzo_invoices.data[0].integration_meta?.quickBooks_id;
      }
      if (!quickBooks_invoice_id) {
        const query = `select * from invoice where DocNumber = '${invoice_serial_number}'`;
        const qb_invoices = await qbo.invoice.find({ query });
        if (qb_invoices.QueryResponse.Invoice?.length) {
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

    const quickbooks_payment: Payment.Create.Body = {
      DocNumber: repzo_payment.serial_number.formatted,
      CurrencyRef: { name: "", value: repzo_payment.currency },
      CustomerRef: {
        name: repzo_client.name,
        value: repzo_client.integration_meta?.quickBooks_id,
      },
      PrivateNote: `invoice ${quickBooks_invoice_id}`, // repzo_invoice.integration_meta?.quickBooks_DocNumber
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
  } catch (e: any) {
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
