export declare namespace Item {
  interface ReferenceType {
    value: string;
    name: string;
  }
  interface ModificationMetaData {
    CreateTime: Date;
    LastUpdatedTime: Date;
  }
  export interface ItemObject {
    Id: string;
    ItemCategoryType: string;
    Name: string;
    SyncToken: string;
    InvStartDate: Date;
    Type: string;
    QtyOnHand: number;
    AssetAccountRef: ReferenceType;
    SalesTaxCodeRef?: ReferenceType;
    PrefVendorRef?: ReferenceType;
    PurchaseTaxCodeRef?: ReferenceType;
    ParentRef?: ReferenceType;
    ClassRef?: ReferenceType;
    IncomeAccountRef?: ReferenceType;
    TaxClassificationRef?: ReferenceType;
    ExpenseAccountRef?: ReferenceType;
    Sku?: string;
    UQCId?: string;
    Source?: string;
    PurchaseTaxIncluded?: boolean;
    SalesTaxIncluded: boolean;
    TrackQtyOnHand?: boolean;
    SubItem?: boolean;
    Taxable?: boolean;
    Active?: boolean;
    ReorderPoint?: number;
    AbatementRate?: number;
    ReverseChargeRate?: number;
    UnitPrice?: number;
    Level?: number;
    UQCDisplayText?: string;
    FullyQualifiedName?: string;
    Description?: string;
    ServiceType?: ServiceType;
    PurchaseCost?: string;
    MetaData: ModificationMetaData;
  }
  export type ServiceType =
    | "ADVT"
    | "AIRTRANSPORT"
    | "AIRTRVLAGNT"
    | "ARCHITECT"
    | "ASSTMGMT"
    | "ATMMAINTENANCE"
    | "AUCTIONSERV"
    | "AUTHSERST"
    | "BANKANDFIN"
    | "BEAUTYPARLOR"
    | "BROADCAST"
    | "AIRPORTSERVICES"
    | "BUSINESSAUX"
    | "BUSINESSEXHIBITION"
    | "BUSINESSSUPPORTSERV"
    | "CA"
    | "CABLEOPTR"
    | "CARGOHAND"
    | "CLEANINGSERV"
    | "CLEARANDFORW"
    | "CLUBSANDASSSERVICE"
    | "COMMCOACHORTRAINING";
  interface itemBody {
    Name: string;
    Type: string;
    QtyOnHand: number;
    IncomeAccountRef: ReferenceType;
    AssetAccountRef: ReferenceType;
    ExpenseAccountRef: ReferenceType;
    InvStartDate: Date;
  }
  export namespace Find {
    type Params = {
      query: string;
      [key: string]: any;
    };
    interface Result {
      QueryResponse: {
        Item: ItemObject[];
      };
      time: Date;
    }
  }
  export namespace Create {
    interface Body extends itemBody {}
    type Result = ItemObject;
  }
  export namespace Update {
    type ID = string;
    interface Body extends itemBody {
      Id: string;
      SyncToken: string;
    }
    type Result = ItemObject;
  }
  export {};
}
