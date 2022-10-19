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
export declare type StringId = string;
export declare type NameSpaces = string[];
