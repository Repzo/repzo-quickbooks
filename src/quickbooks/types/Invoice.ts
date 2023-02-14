export namespace Invoice {
  interface ReferenceType {
    value: string;
    name: string;
  }
  interface MemoRef {
    value: string;
  }
  interface ModificationMetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  interface TxnTaxDetail {
    TxnTaxCodeRef?: ReferenceType;
    TotalTax?: number;
    TaxLine?: Line;
  }
  interface EmailAddress {
    Address: string;
  }
  interface DeliveryInfo {
    DeliveryType: "Email";
    DeliveryTime: {
      dateTime: string;
    };
  }
  interface LinkedTxn {
    TxnId: string;
    TxnType: string;
    TxnLineId: string;
  }
  type PhysicalAddress = any;
  interface MarkupInfo {
    PriceLevelRef?: ReferenceType;
    MarkUpIncomeAccountRef?: ReferenceType;
    Percent?: number;
  }
  interface GroupLineDetail {
    Quantity: number;
    Line: Line[];
    GroupItemRef: ReferenceType;
  }
  interface DescriptionLineDetail {
    ServiceDate: Date;
    TaxCodeRef?: ReferenceType;
  }
  interface DiscountLineDetail {
    TaxCodeRef?: ReferenceType;
    ClassRef?: ReferenceType;
    DiscountAccountRef?: ReferenceType;
    PercentBased?: boolean;
    DiscountPercent?: boolean;
  }
  interface SalesItemLineDetail {
    TaxInclusiveAmt?: number;
    DiscountAmt?: number;
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
  interface LineDetail {
    ItemRef: ReferenceType;
  }

  interface GroupLine {
    Id: string;
    GroupLineDetail: GroupLineDetail;
    DetailType: "GroupLineDetail";
    LineNum?: number;
    Description?: string;
  }

  interface SalesItemLine {
    Id: String;
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: SalesItemLineDetail;
    Amount: number;
    LineNum?: number;
    Description?: string;
  }

  interface DescriptionOnlyLine {
    Id: String;
    DetailType: "DescriptionOnly";
    Description?: string;
    DescriptionLineDetail: DescriptionLineDetail;
    LineNum?: number;
    Amount: number;
  }
  interface DiscountLine {
    Id: String;
    DetailType: "DiscountLineDetail";
    DiscountLineDetail: DiscountLineDetail;
    Amount: number;
    LineNum?: number;
    Description?: string;
  }
  interface SubTotalLine {
    Id: String;
    SubtotalLineDetail: LineDetail;
    DetailType: "SubtotalLineDetail";
    Amount: number;
    LineNum?: number;
    Description?: string;
  }

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
    SyncToken: String;
    CurrencyRef: ReferenceType;
    DocNumber: String;
    BillEmail: EmailAddress;
    TxnDate?: Date;
    ShipFromAddr?: PhysicalAddress;
    ShipDate?: Date;
    TrackingNum?: String;
    ClassRef?: ReferenceType;
    PrintStatus?: "NotSet" | "NeedToSend" | "EmailSent";
    SalesTermRef?: ReferenceType;
    TxnSource?: String;
    LinkedTxn?: LinkedTxn[];
    DepositToAccountRef?: ReferenceType;
    GlobalTaxCalculation?: GlobalTaxCalculationEnum;
    AllowOnlineACHPayment?: boolean;
    TransactionLocationType?: String;
    DueDate?: Date;
    MetaData?: ModificationMetaData;
    PrivateNote?: string;
    BillEmailCc: EmailAddress;
    CustomerMemo: MemoRef;
    EmailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
    ExchangeRate?: number;
    Deposit?: number;
    TxnTaxDetail?: TxnTaxDetail;
    AllowOnlineCreditCardPayment?: boolean;
    CustomField?: any;
    DepartmentRef?: ReferenceType;
    BillEmailBcc?: EmailAddress;
    ShipMethodRef?: ReferenceType;
    BillAddr?: PhysicalAddress;
    ApplyTaxAfterDiscount?: boolean;
    HomeBalance?: number;
    DeliveryInfo?: DeliveryInfo;
    TotalAmt?: number;
    InvoiceLink?: string;
    RecurDataRef?: ReferenceType;
    TaxExemptionRef?: ReferenceType;
  }

  export type GlobalTaxCalculationEnum =
    | "TaxExcluded"
    | "TaxInclusive"
    | "NotApplicable";

  interface InvoiceBody extends InvoiceObject {}

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Item?: InvoiceBody[];
        Invoice?: InvoiceBody[];
        startPosition: number;
        maxResults: number;
        totalCount: number;
      };
      time: Date;
    }
  }

  export namespace Create {
    export type XLine = Line[];
    export interface Body {
      DocNumber: string;
      Line: Line[];
      DueDate?: Date;
      CustomerRef: ReferenceType;
      CurrencyRef: ReferenceType;
    }
    export type Result = {
      Invoice: InvoiceObject;
      time: Date;
    };
  }

  export namespace Update {
    export type ID = string;
    export interface Body {
      Line: Line[];
      CustomerRef: ReferenceType;
      CurrencyRef: ReferenceType;
    }
    export type Result = {
      Invoice: InvoiceObject;
      time: Date;
    };
  }
}
