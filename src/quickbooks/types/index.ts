export interface Params {
  [key: string]: any;
}

export interface Data {
  [key: string]: any;
}
export interface Options {
  env?: "staging" | "local" | "production";
  headers?: { [key: string]: string };
}
export interface Headers {
  "Content-Type": string;
  Accept: string;
  [key: string]: string;
}

export type StringId = string;
export type NameSpaces = string[];
