export declare namespace Payment {
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
    interface PaymentBody extends PaymentObject {
    }
    export namespace Find {
        type Params = {
            query: string;
            [key: string]: any;
        };
        interface Result {
            QueryResponse: {
                Item: PaymentBody[];
            };
            time: Date;
        }
    }
    export namespace Create {
        interface Body {
            TotalAmt: number;
            CustomerRef: ReferenceType;
            CurrencyRef: ReferenceType;
            PrivateNote?: String;
        }
        type Result = {
            Payment: PaymentObject;
            time: Date;
        };
    }
    export namespace Update {
        type ID = string;
        interface Body {
            TotalAmt: number;
            CustomerRef: ReferenceType;
            CurrencyRef: ReferenceType;
        }
        type Result = {
            Payment: PaymentObject;
            time: Date;
        };
    }
    export {};
}
