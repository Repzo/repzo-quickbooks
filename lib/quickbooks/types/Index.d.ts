export interface Params {
  [key: string]: any;
}
export interface Data {
  [key: string]: any;
}
export interface QuickBooksConfig {
  intgAppId?: string;
  refreshKey?: string;
  oauthToken: string;
  realmId: string;
  minorversion?: number;
  sandbox: boolean;
}
export interface Authorization {
  Authorization: string;
  [key: string]: string;
}
export type StringId = string;
export type NameSpaces = string[];
