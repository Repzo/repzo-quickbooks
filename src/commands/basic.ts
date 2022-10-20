import Repzo from "repzo";
import { CommandEvent } from "../types";
import { commands, commandsList } from "./index.js";

export const basic = async (commandEvent: CommandEvent) => {
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
    await commandLog.addDetail("Repzo QuickBooks: Basic Sync").commit();
    const required_syncing_commands = [
      "sync_clients",
      "sync_taxs",
      "sync_products",
    ];
    for (let i = 0; i < required_syncing_commands.length; i++) {
      const command = required_syncing_commands[i];
      const commandDes = commandsList.find((c) => c.command == command);
      const event: CommandEvent = JSON.parse(JSON.stringify(commandEvent));
      event.command = command;
      await commandLog
        .addDetail(`Start Syncing: ${commandDes?.name || command}`)
        .commit();
      await commands(event);
    }

    await commandLog
      .setStatus("success")
      .setBody("Complete Basic Sync")
      .commit();
  } catch (e: any) {
    //@ts-ignore
    console.error(e?.response?.data || e);
    await commandLog.setStatus("fail", e).commit();
    throw e;
  }
};
