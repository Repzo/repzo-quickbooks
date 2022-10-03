export namespace Invoice {
  interface ReferenceType {
    value: string;
    name: string;
  }
  interface ModificationMetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  interface EmailAddress {
    Address: string;
  }
  interface MarkupInfo {
    PriceLevelRef?: ReferenceType;
    MarkUpIncomeAccountRef?: ReferenceType;
    Percent?: number;
  }
  interface SalesItemLineDetail {
    TaxInclusiveAmt: number;
    DiscountAmt: number;
    ItemRef?: ReferenceType;
    ClassRef?: ReferenceType;
    ItemAccountRef?: ReferenceType;
    TaxCodeRef?: ReferenceType;
    TaxClassificationRef?: ReferenceType;
    MarkupInfo?: MarkupInfo;
    ServiceDate?: Date;
    DiscountRate?: number;
    Qty?: number;
    UnitPrice?: number;
  }
  interface SalesItemLine {
    Id: String;
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: SalesItemLineDetail;
    Amount: number;
    LineNum: number;
    Description?: string;
  }
  interface GroupLine {}
  interface DescriptionOnlyLine {}
  interface DiscountLine {}
  interface SubTotalLine {}

  type Line =
    | SalesItemLine
    | GroupLine
    | DescriptionOnlyLine
    | DiscountLine
    | SubTotalLine;

  export interface InvoiceObject {
    Id: string;
    Line: Line[];
    CustomerRef: ReferenceType;
    CurrencyRef: ReferenceType;
    DepositToAccountRef?: ReferenceType;
    DocNumber: String;
    EmailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
    SyncToken: String;
    BillEmail: EmailAddress;
    TxnDate?: Date;
    ShipFromAddr?: String;
    GlobalTaxCalculation?: GlobalTaxCalculationEnum;
    AllowOnlineACHPayment?: boolean;
    TransactionLocationType?: String;
    DueDate?: Date;
    MetaData?: ModificationMetaData;
    ExchangeRate?: number;
    Deposit?: number;
    AllowOnlineCreditCardPayment?: boolean;
  }

  export type GlobalTaxCalculationEnum =
    | "TaxExcluded"
    | "TaxInclusive"
    | "NotApplicable";

  interface InvoiceBody {}

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Item: InvoiceBody[];
      };
      time: Date;
    }
  }

  export namespace Create {
    export interface Body extends InvoiceBody {}
    export type Result = InvoiceObject;
  }

  export namespace Update {
    export type ID = string;
    export interface Body extends InvoiceBody {
      Id: string;
      SyncToken: string;
    }
    export type Result = InvoiceObject;
  }
}
