export namespace Payment {
  interface ReferenceType {
    value: string;
    name: string;
  }

  interface ModificationMetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }

  type CCPaymentStatusEnum = "Completed" | "Unknown";
  interface CreditChargeResponse {
    Status: CCPaymentStatusEnum;
    AuthCode: string;
    TxnAuthorizationTime: Date;
    CCTransId: string;
  }
  interface CreditChargeInfo {
    CcExpiryMonth?: number;
    ProcessPayment?: boolean;
    PostalCode?: string;
    Type?: string;
    BillAddrStreet?: string;
    Amount?: number;
    NameOnAcct?: string;
    CcExpiryYear?: number;
  }
  interface CreditCardPayment {
    CreditChargeResponse?: CreditChargeResponse;
    CreditChargeInfo?: CreditChargeInfo;
  }
  interface LinkedTxn {
    TxnId: string;
    TxnType: string;
    TxnLineId: string;
  }
  interface Line {
    Amount: number;
    LinkedTxn: LinkedTxn[];
  }
  export interface PaymentObject {
    Id: string;
    TotalAmt: number;
    CustomerRef: ReferenceType;
    CurrencyRef: ReferenceType;
    SyncToken: String;
    PaymentMethodRef?: ReferenceType;
    DepositToAccountRef?: ReferenceType;
    TaxExemptionRef?: ReferenceType;
    ARAccountRef?: ReferenceType;
    PrivateNote?: String;
    TxnSource?: String;
    UnappliedAmt?: number;
    ExchangeRate?: number;
    TxnDate?: Date;
    CreditCardPayment?: CreditCardPayment;
    TransactionLocationType?: string;
    MetaData?: ModificationMetaData;
    PaymentRefNum?: string;
  }

  interface PaymentBody extends PaymentObject {}

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Item: PaymentBody[];
      };
      time: Date;
    }
  }

  export namespace Create {
    export interface Body {
      TotalAmt: number;
      CustomerRef: ReferenceType;
      CurrencyRef: ReferenceType;
      PrivateNote?: String;
    }
    export type Result = {
      Payment: PaymentObject;
      time: Date;
    };
  }

  export namespace Update {
    export type ID = string;
    export interface Body {
      TotalAmt: number;
      CustomerRef: ReferenceType;
      CurrencyRef: ReferenceType;
    }
    export type Result = {
      Payment: PaymentObject;
      time: Date;
    };
  }
}
