export namespace TaxRate {
  interface ReferenceType {
    value: string;
    name: string;
  }
  interface ModificationMetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  interface EffectiveTaxRateData {
    RateValue: number;
    EndDate: String;
    EffectiveDate: String;
  }
  export interface TaxRateObject {
    Id?: string;
    RateValue: string;
    Name: string;
    SyncToken: string;
    AgencyRef?: ReferenceType;
    TaxReturnLineRef?: ReferenceType;
    SpecialTaxType?: string;
    Active?: boolean;
    EffectiveTaxRate?: EffectiveTaxRateData;
    MetaData: ModificationMetaData;
    OriginalTaxRate?: string;
    Description?: string;
  }

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        TaxRate: TaxRateObject[];
      };
      time: Date;
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
