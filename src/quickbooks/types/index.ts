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

interface AdminCreator {
  _id: string;
  type: "admin";
  name?: string;
  admin?: string;
}
interface RepCreator {
  _id: string;
  type: "rep";
  name?: string;
  rep?: string;
}
interface ClientCreator {
  _id: string;
  type: "client";
  name?: string;
  client?: string;
}
interface SerialNumber {
  identifier: string;
  formatted: string;
  count: number;
}
interface PaymentData {
  payment_serial_number?: SerialNumber;
  payment_id?: string;
  invoice_serial_number?: SerialNumber;
  return_serial_number?: SerialNumber;
  fullinvoice_id?: string;
  refund_serial_number?: SerialNumber;
  refund_id?: string;
  adjustment_serial_number?: SerialNumber;
  adjustment_id?: string;
  adjustment_account_id?: string;
  view_serial_number?: SerialNumber;
  type?: "invoice" | "payment" | "return_invoice" | "refund" | "adjustment";
  amount: number;
  is_linked_txn?: boolean;
}
interface Check {
  _id: string;
  drawer_name: string;
  bank: string;
  bank_branch: string;
  check_number: number;
  check_date: string;
  photo?: string;
  caption?: string;
  photo_meta?: {
    device_orientation?: number;
    height?: number;
    width?: number;
  };
  disabled?: boolean;
}

export interface DefaultPaginationQueryParams {
  per_page?: number;
  page?: number;
  sort?: string;
  sortPageOrder?: "asc" | "dsc";
}

// <reference path = "vehicle.ts" />
export namespace Service {
  export namespace Customer {
    interface Financials {
      credit_limit?: number;
    }
    type JobType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    interface JobObject {
      type: JobType[];
      description: string;
      tag: string;
      product_id?: string;
      form_id?: string;
      is_required?: boolean;
      category_id?: string;
      order?: number;
      company_namespace: string[];
    }
    interface ShelfShareTarget {
      msl: string;
      contracted_checkout: number;
      contracted_shelf_length: number;
      total_category_length: number;
    }
    interface RepTarget {
      rep: string;
      target: number;
      classification: string;
    }
    export interface CustomerSchema {
      Id: string;
      SyncToken: string;
      DisplayName: string;
      Title: string;
      GivenName: string;
      FamilyName: string;
      Suffix: string;
      PrimaryEmailAddr?: object;
      tags?: string[];
      ResaleNum?: string;
      SecondaryTaxIdentifier?: string;
      PreferredDeliveryMethod?: string;
      Fax?: string;
      BusinessNumber?: string;
      Notes?: string;
      BillWithParent?: boolean;
      Taxable?: boolean;
      CompanyName: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface ClientBody {
      FullyQualifiedName: string;
      DisplayName: string;
      Title: string;
      GivenName: string;
      FamilyName: string;
      Suffix: string;
      PrimaryEmailAddr?: object;
      BillAddr: object;
    }
    type PopulatedKeys =
      | "tags"
      | "reps"
      | "assigned_to"
      | "sv_priceList"
      | "paymentTerm"
      | "job_category"
      | "msl"
      | "chain"
      | "channel"
      | "product"
      | "assigned_products"
      | "assigned_product_groups"
      | "speciality"
      | "teams";

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        query: string;
        [key: string]: any; // integration_meta. & customFields.
      };
      export interface Result {
        QueryResponse: {
          Customer: CustomerSchema[];
        };
        time: Date;
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
    }

    export namespace Create {
      export interface Body extends ClientBody {
        name: string;
      }
      export type Result = CustomerSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends ClientBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = CustomerSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = CustomerSchema;
    }
  }
}

export type StringId = string;
export type NameSpaces = string[];
