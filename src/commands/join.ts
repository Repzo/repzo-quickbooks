import Repzo from "repzo";
import { Service } from "repzo/lib/types";
import { EVENT, Config, CommandEvent } from "../types";

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
    console.log("join");

    await commandLog.load(commandEvent.sync_id);
    await commandLog.addDetail("Repzo QuickBooks: Join").commit();

    const body: Service.JoinActionsWeHook.Data = {
      data: [
        {
          app: "repzo-QuickBooks",
          action: "create_invoice",
          event: "invoiceItems.create",
          join:
            commandEvent?.app?.formData?.invoices?.createInvoiceHook || false,
        },
        {
          app: "repzo-QuickBooks",
          action: "create_creditNote",
          event: "returnItems.create",
          join:
            commandEvent?.app?.formData?.invoices?.createCreditNoteHook ||
            false,
        },
        // payment
        {
          app: "repzo-QuickBooks",
          action: "create_payment",
          event: "payment.create",
          join:
            commandEvent?.app?.formData?.payments?.createPaymentHook || false,
        },
      ],
    };

    const result = await repzo.joinActionsWebHook.update(null, body);
    // console.log(result);

    await commandLog.setStatus("success").setBody(result).commit();
  } catch (e: any) {
    //@ts-ignore
    console.error(e?.response?.data || e);
    await commandLog.setStatus("fail", e).commit();
    throw e;
  }
};
