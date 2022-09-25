export namespace Customer {
  interface ReferenceType {
    value: string;
    name: string;
  }
  interface BillAddr {
    City: string;
    Line1: string;
    PostalCode?: string;
    Lat?: string;
    Long?: boolean;
    CountrySubDivisionCode?: string;
    Id: string;
  }
  interface PaymentMethodRef extends ReferenceType {}
  interface CurrencyRef extends ReferenceType {}
  interface TelephoneNumber {
    FreeFormNumber: string;
  }
  interface EmailAddress {
    Address: string;
  }

  export type TaxExemptionReasonId =
    | "Federal government"
    | "State government"
    | "Local government"
    | "Tribal government"
    | "Charitable organization"
    | "Religious organization"
    | "Educational organization"
    | "Hospital"
    | "Resale"
    | "Direct pay permit"
    | "Multiple points of use"
    | "Direct mail"
    | "Agricultural production"
    | "Industrial production / manufacturing"
    | "Foreign diplomat";

  interface MetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  export interface CustomerObject {
    Id: string;
    SyncToken: string;
    DisplayName: string;
    Title: string;
    GivenName: string;
    FamilyName: string;
    PrimaryPhone?: TelephoneNumber;
    Mobile?: TelephoneNumber;
    CurrencyRef?: CurrencyRef;
    Suffix: string;
    BalanceWithJobs: number;
    MetaData: MetaData;
    PrimaryEmailAddr?: EmailAddress;
    ResaleNum?: string;
    SecondaryTaxIdentifier?: string;
    PreferredDeliveryMethod?: string;
    Fax?: string;
    Balance: number;
    Active?: boolean;
    Source?: string;
    PaymentMethodRef?: PaymentMethodRef;
    BusinessNumber?: string;
    Notes?: string;
    BillAddr: BillAddr;
    BillWithParent?: boolean;
    Taxable?: boolean;
    CompanyName: string;
    createdAt: string;
    updatedAt: string;
    IsProject?: Boolean;
    __v: number;
  }
  interface ClientBody {
    FullyQualifiedName?: string;
    DisplayName: string;
    Title: string;
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
    Suffix: string;
    Notes?: string;
    CompanyName?: string;
    PrimaryEmailAddr?: object;
    BillAddr?: BillAddr;
  }

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Customer: CustomerObject[];
      };
      time: Date;
    }
  }

  export namespace Get {
    export type ID = string;
  }

  export namespace Create {
    export interface Body extends ClientBody {}
    export type Result = CustomerObject;
  }

  export namespace Update {
    export type ID = string;
    export interface Body extends ClientBody {
      Id: string;
      SyncToken: string;
    }
    export type Result = CustomerObject;
  }
}
