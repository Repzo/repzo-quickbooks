import Repzo from "repzo";
import { Service } from "repzo/lib/types";
import { CommandEvent } from "../types";

export const join = async (commandEvent: CommandEvent) => {
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });

  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  try {
    await commandLog.load(commandEvent.sync_id);
    await commandLog.addDetail("⌛ Repzo QuickBooks: Join").commit();

    const body: Service.JoinActionsWeHook.Data = {
      data: [
        // invoice
        {
          app: "repzo-quickbooks",
          app_id: commandEvent?.app?._id,
          action: "create_invoice",
          event: "invoiceItems.create",
          join:
            commandEvent?.app?.formData?.Invoices?.createInvoiceHook || false,
        },
        // return_invoice
        {
          app: "repzo-quickbooks",
          app_id: commandEvent?.app?._id,
          action: "create_return_invoice",
          event: "returnItems.create",
          join:
            commandEvent?.app?.formData?.ReturnInvoices
              ?.createReturnInvoiceHook || false,
        },
        // client
        {
          app: "repzo-quickbooks",
          app_id: commandEvent?.app?._id,
          action: "create_customer",
          event: "client.create",
          join:
            commandEvent?.app?.formData?.Customers?.createClientHook || false,
        },
        // payment
        {
          app: "repzo-quickbooks",
          app_id: commandEvent?.app?._id,
          action: "create_payment",
          event: "payment.create",
          join:
            commandEvent?.app?.formData?.Payments?.createPaymentHook || false,
        },
      ],
    };
    const result = await repzo.joinActionsWebHook.update(null, body);
    await commandLog.setStatus("success").setBody(result).commit();
  } catch (e: any) {
    //@ts-ignore
    console.error(e?.response?.data || e);
    await commandLog.setStatus("fail", e).commit();
    throw e;
  }
};
