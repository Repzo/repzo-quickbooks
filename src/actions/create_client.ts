import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { _fetch, _create, _update, _delete } from "../util.js";
import { Service } from "repzo/src/types";
import { v4 as uuid } from "uuid";

interface QBClient {
  contact: {
    name: string;
    organization?: string;
    email?: string;
    phone_number?: string;
    status?: "Active" | "Inactive";
  };
}

export const create_client = async (event: EVENT, options: Config) => {
  // const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
};
