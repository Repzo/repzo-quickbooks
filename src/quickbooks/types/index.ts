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
}

export interface Headers {
  "Content-Type": string;
  "Request-Id": string;
  Accept: string;
  Authorization: string;
  [key: string]: string;
}

export type StringId = string;
export type NameSpaces = string[];
