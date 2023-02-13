export namespace Item {
  interface ReferenceType {
    value: string;
    name: string;
  }

  interface ModificationMetaData {
    CreateTime: Date | string;
    LastUpdatedTime: Date | string;
  }

  export interface ItemObject {
    Id: string;
    ItemCategoryType?: string;
    Name: string;
    SyncToken: string;
    InvStartDate?: Date | string;
    Type: string;
    QtyOnHand?: number;
    AssetAccountRef?: ReferenceType;
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
    SalesTaxIncluded?: boolean;
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
    PurchaseCost?: string | number;
    MetaData: ModificationMetaData;
    domain?: string;
    sparse?: boolean;
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
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Item: ItemObject[];
      };
      time: Date | string;
    }
  }

  export namespace Create {
    export interface Body extends itemBody {}
    export type Result = ItemObject;
  }

  export namespace Update {
    export type ID = string;
    export interface Body extends itemBody {
      Id: string;
      SyncToken: string;
    }
    export type Result = ItemObject;
  }
}
