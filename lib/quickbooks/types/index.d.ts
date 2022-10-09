export interface Params {
  [key: string]: any;
}
export interface Data {
  [key: string]: any;
}
export interface QuickBooksConfig {
  oauthToken: string;
  realmId: string;
  minorversion?: number;
  sandbox: boolean;
}
export interface Headers {
  "Content-Type": string;
  "Request-Id": string;
  Accept: string;
  Authorization: string;
  [key: string]: string;
}
export declare type StringId = string;
export declare type NameSpaces = string[];
