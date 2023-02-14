export namespace TaxRate {
  interface ReferenceType {
    value: string;
    name?: string;
  }
  interface ModificationMetaData {
    CreateTime: Date | string;
    LastUpdatedTime: Date | string;
  }
  interface EffectiveTaxRateData {
    RateValue?: number;
    EndDate?: String;
    EffectiveDate: String;
  }
  export interface TaxRateObject {
    Id?: string;
    RateValue: string | number;
    Name: string;
    SyncToken: string;
    AgencyRef?: ReferenceType;
    TaxReturnLineRef?: ReferenceType;
    SpecialTaxType?: string;
    Active?: boolean;
    EffectiveTaxRate?: EffectiveTaxRateData[];
    MetaData: ModificationMetaData;
    OriginalTaxRate?: string;
    Description?: string;
    domain?: string;
    sparse?: boolean;
    DisplayType?: string;
  }

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        TaxRate: TaxRateObject[];
        startPosition?: number;
        maxResults?: number;
        totalCount?: number;
      };
      time: Date | string;
    }
  }

  export namespace Create {
    export interface Body extends TaxRateObject {}
    export type Result = {
      TaxRate: TaxRateObject;
      time: Date;
    };
  }

  export namespace Update {
    export type ID = string;
    export interface Body extends TaxRateObject {}
    export type Result = {
      TaxRate: TaxRateObject;
      time: Date;
    };
  }
}

export namespace TaxCode {
  interface ReferenceType {
    value: string;
    name?: string;
  }
  interface TaxRateDetail {
    TaxRateRef: ReferenceType;
    TaxTypeApplicable?: "TaxOnAmount" | "TaxOnAmountPlusTax" | "TaxOnTax";
    TaxOrder?: number;
  }
  export interface TaxCodeObject {
    Id: string;
    Name: string;
    Active: boolean;
    Taxable: boolean;
    TaxGroup: boolean;
    SalesTaxRateList: {
      TaxRateDetail: TaxRateDetail[];
    };
    SyncToken?: string;
    domain?: string;
    PurchaseTaxRateList?: {
      TaxRateDetail: TaxRateDetail[];
    };
    sparse?: boolean;
    Description?: string;
    Hidden?: boolean;
    TaxCodeConfigType?: string;
    MetaData: {
      CreateTime: Date | string;
      LastUpdatedTime: Date | string;
    };
  }

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any;
    };
    export interface Result {
      QueryResponse: {
        TaxCode: TaxCodeObject[];
        startPosition?: number;
        maxResults?: number;
        totalCount?: number;
      };
      time: Date | string;
    }
  }
}

export interface Tax {
  Id: string | number;
  Name: string;
  Active: boolean;
  MetaData: {
    CreateTime: Date | string;
    LastUpdatedTime: Date | string;
  };
  RateValue: number;
}
