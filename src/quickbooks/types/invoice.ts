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
  interface CustomField {}

  interface Line {
    SalesItemLine: String;
    GroupLine: String;
    DescriptionOnlyLine: String;
    DiscountLine: String;
    SubTotalLine: String;
  }

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
