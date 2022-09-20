export namespace Customer {
  interface BillAddr {
    City: string;
    Line1: string;
    PostalCode?: string;
    Lat?: string;
    Long?: boolean;
    CountrySubDivisionCode?: string;
    Id: string;
  }

  interface MetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  export interface CustomerSchema {
    Id: string;
    SyncToken: string;
    DisplayName: string;
    Title: string;
    GivenName: string;
    FamilyName: string;
    Suffix: string;
    BalanceWithJobs: number;
    MetaData: MetaData;
    PrimaryEmailAddr?: object;
    ResaleNum?: string;
    SecondaryTaxIdentifier?: string;
    PreferredDeliveryMethod?: string;
    Fax?: string;
    BusinessNumber?: string;
    Notes?: string;
    BillAddr: BillAddr;
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
    BillAddr: BillAddr;
  }

  export namespace Find {
    export type Params = {
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
