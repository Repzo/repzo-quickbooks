import jwt from "jsonwebtoken";
import { Service } from "repzo/src/types";

type ENV = "staging" | "production" | "local";
type DecodedScope = "admin" | "client" | "rep";
type StringId = string;
type Email = string;
type NameSpaces = string[];

export interface Config {
  data?: any;
  env: ENV;
  oauth2_data: Oauth2_data;
}

export type Decoded = jwt.JwtPayload & {
  id?: StringId;
  email?: Email;
  name?: string;
  team?: StringId[];
  scope?: DecodedScope;
  nameSpace?: NameSpaces;
  permaString?: string;
  timezone?: string;
};

interface Params {
  nameSpace: NameSpaces;
  decoded: Decoded;
}

export type EVENT = AWSLambda.APIGatewayEvent & { params: Params };
export interface Action {
  name: string;
  action: string;
  description: string;
}

export interface Command {
  command: string;
  description: string;
  name: string;
}

export interface AvailableApp {
  _id: StringId;
  name: string;
  disabled: boolean;
  JSONSchema: any;
  UISchema: any;
  app_settings: { repo: string; serviceEndPoint: string; meta: {} };
  app_category: string;
}

interface Oauth2_data {
  realmId: string;
  access_token: string;
}

export interface Result {
  QuickBooks_total: number;
  repzo_total: number;
  created: number;
  updated: number;
  failed: number;
}

export interface CommandEvent {
  app: Service.App.Schema_with_populated_AvailableApp;
  command: string;
  nameSpace: NameSpaces;
  meta?: any;
  sync_id?: string;
  end_of_day: string;
  timezone: string;
  data?: any;
  env: ENV;
  oauth2_data?: Oauth2_data;
}
