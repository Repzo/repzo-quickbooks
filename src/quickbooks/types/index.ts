export interface Params {
  [key: string]: any;
}

export interface Data {
  [key: string]: any;
}
export interface Options {
  env?: "staging" | "local" | "production";
  headers?: { [key: string]: string };
}
export interface Headers {
  "Content-Type": string;
  Accept: string;
  [key: string]: string;
}

interface AdminCreator {
  _id: string;
  type: "admin";
  name?: string;
  admin?: string;
}
interface RepCreator {
  _id: string;
  type: "rep";
  name?: string;
  rep?: string;
}
interface ClientCreator {
  _id: string;
  type: "client";
  name?: string;
  client?: string;
}
interface SerialNumber {
  identifier: string;
  formatted: string;
  count: number;
}
interface PaymentData {
  payment_serial_number?: SerialNumber;
  payment_id?: string;
  invoice_serial_number?: SerialNumber;
  return_serial_number?: SerialNumber;
  fullinvoice_id?: string;
  refund_serial_number?: SerialNumber;
  refund_id?: string;
  adjustment_serial_number?: SerialNumber;
  adjustment_id?: string;
  adjustment_account_id?: string;
  view_serial_number?: SerialNumber;
  type?: "invoice" | "payment" | "return_invoice" | "refund" | "adjustment";
  amount: number;
  is_linked_txn?: boolean;
}
interface Check {
  _id: string;
  drawer_name: string;
  bank: string;
  bank_branch: string;
  check_number: number;
  check_date: string;
  photo?: string;
  caption?: string;
  photo_meta?: {
    device_orientation?: number;
    height?: number;
    width?: number;
  };
  disabled?: boolean;
}

export interface DefaultPaginationQueryParams {
  per_page?: number;
  page?: number;
  sort?: string;
  sortPageOrder?: "asc" | "dsc";
}

export interface DefaultPaginationResult {
  total_result: number;
  current_count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  data: any[];
}

// <reference path = "vehicle.ts" />
export namespace Service {
  export namespace Customer {
    interface Financials {
      credit_limit?: number;
    }
    type JobType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    interface JobObject {
      type: JobType[];
      description: string;
      tag: string;
      product_id?: string;
      form_id?: string;
      is_required?: boolean;
      category_id?: string;
      order?: number;
      company_namespace: string[];
    }
    interface ShelfShareTarget {
      msl: string;
      contracted_checkout: number;
      contracted_shelf_length: number;
      total_category_length: number;
    }
    interface RepTarget {
      rep: string;
      target: number;
      classification: string;
    }
    export interface CustomerSchema {
      Id: string;
      SyncToken: string;
      DisplayName: string;
      Title: string;
      GivenName: string;
      FamilyName: string;
      Suffix: string;
      PrimaryEmailAddr?: object;
      tags?: string[];
      ResaleNum?: string;
      SecondaryTaxIdentifier?: string;
      PreferredDeliveryMethod?: string;
      Fax?: string;
      BusinessNumber?: string;
      Notes?: string;
      BillWithParent?: boolean;
      Taxable?: boolean;
      CompanyName: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface ClientBody {
      FullyQualifiedName: string;
      DisplayName: string;
      Title: string;
      GivenName: string;
      FamilyName: string;
      Suffix: string;
      PrimaryEmailAddr?: object;
      BillAddr: object;
    }
    type PopulatedKeys =
      | "tags"
      | "reps"
      | "assigned_to"
      | "sv_priceList"
      | "paymentTerm"
      | "job_category"
      | "msl"
      | "chain"
      | "channel"
      | "product"
      | "assigned_products"
      | "assigned_product_groups"
      | "speciality"
      | "teams";

    type ClientSchemaWithPopulatedKeys = CustomerSchema & {
      assigned_products?:
        | string[]
        | Pick<Product.ProductSchema, "_id" | "name">[];
      assigned_product_groups?:
        | string
        | Pick<ProductGroup.ProductGroupSchema, "_id" | "name">[];
      teams?: string[] | Pick<Team.TeamSchema, "_id" | "name">[];
      assigned_to?: string[] | Pick<Rep.RepSchema, "_id" | "name">[];
      tags?: string[] | Tag.TagSchema[];
      price_tag?: string | Tag.TagSchema;
      job_category?: string[] | JobCategory.JobCategorySchema[];
      sv_priceList?: string | Pick<PriceList.PriceListSchema, "_id" | "name">[];

      channel?: string | Channel.ChannelSchema;
    };

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        query: string;
        [key: string]: any; // integration_meta. & customFields.
      };
      export interface Result extends DefaultPaginationResult {
        QueryResponse: {
          Customer: ClientSchemaWithPopulatedKeys[];
        };
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = ClientSchemaWithPopulatedKeys;
    }

    export namespace Create {
      export interface Body extends ClientBody {
        name: string;
      }
      export type Result = CustomerSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends ClientBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = CustomerSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = CustomerSchema;
    }
  }

  export namespace Product {
    export interface ProductSchema {
      _id: string;
      name: string;
      category: string;
      active: boolean;
      company_namespace: string[];
      local_name?: string;
      sku?: string;
      sub_category?: string[];
      assigned_to?: string[];
      auditable?: boolean;
      barcode?: string;
      sv_tax?: string;
      sv_measureUnit?: string;
      description?: string;
      local_description?: string;
      product_img?: string;
      base_price?: string;
      assigned_media?: string[];
      html_description?: string;
      modifiers_group?: string[];
      featured?: boolean;
      brand?: string;
      rsp?: number;
      measureunit_family?: string;
      integration_meta?: { [key: string]: any };
      teams?: string[];
      position?: number;
      product_groups?: string[];
      frozen_pre_sales?: boolean;
      frozen_sales?: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface ProductBody {
      name?: string;
      category?: string;
      active?: boolean;
      company_namespace?: string[];
      local_name?: string;
      sku?: string;
      sub_category?: string[];
      assigned_to?: string[];
      auditable?: boolean;
      barcode?: string;
      sv_tax?: string;
      sv_measureUnit?: string;
      description?: string;
      local_description?: string;
      product_img?: string;
      base_price?: string;
      assigned_media?: string[];
      html_description?: string;
      modifiers_group?: string[];
      featured?: boolean;
      brand?: string;
      rsp?: number;
      measureunit_family?: string;
      integration_meta?: { [key: string]: any };
      teams?: string[];
      position?: number;
      product_groups?: string[];
      frozen_pre_sales?: boolean;
      frozen_sales?: boolean;
      variants?: (Variant.VariantBody & {
        name: string;
        product?: string;
        price: number;
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      })[];
    }

    type ProductWithPopulatedKeys = ProductSchema & {
      category: string | Category.CategorySchema;
      sub_category?: string[] | SubCategory.SubCategorySchema[];
      sv_tax?: string | Tax.TaxSchema | Pick<Tax.TaxSchema, "_id" | "name">;
      sv_measureUnit?:
        | string
        | MeasureUnit.MeasureUnitSchema
        | Pick<MeasureUnit.MeasureUnitSchema, "_id" | "name">;
      brand?: string | Brand.BrandSchema;
      measureunit_family?: string | MeasureUnitFamily.MeasureUnitFamilySchema;
      product_groups?:
        | string[]
        | Pick<ProductGroup.ProductGroupSchema, "_id" | "name">[];
      variants?: Variant.VariantSchema[];
      defaultVariant?: Variant.VariantSchema;
      assigned_media?: string | Media.MediaSchema;
    };

    type PopulatedKeys =
      | "category"
      | "sub_category"
      | "tax"
      | "sv_tax"
      | "media"
      | "measureunit_family"
      | "measureunit"
      | "sv_measureUnit"
      | "brand"
      | "product_groups";

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        populatedKeys?: PopulatedKeys[];
        _id?: string[] | string;
        category?: string[] | string;
        sub_category?: string[] | string;
        name?: string[] | string;
        search?: string;
        active?: boolean;
        disabled?: boolean;
        sv_measureUnit?: string[] | string;
        base_price?: number[] | number;
        assigned_media?: string[] | string;
        modifiers_group?: string[] | string;
        brand?: string[] | string;
        rsp?: number[] | number;
        measureunit_family?: string[] | string;
        teams?: string[] | string;
        position?: number[] | number;
        product_groups?: string[] | string;
        sv_tax?: string[] | string;
        createdAt?: number;
        from_updatedAt?: number;
        to_updatedAt?: number;
        barcode?: string[] | string;
        sku?: string[] | string;
        local_name?: string[] | string;
        frozen_pre_sales?: boolean;
        frozen_sales?: boolean;
        withMedia?: boolean;
        withDefaultVariant?: boolean;
        withVariants?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: ProductWithPopulatedKeys[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
        withVariants?: boolean;
      }
      export type Result = ProductWithPopulatedKeys;
    }

    export namespace Create {
      export interface Body extends ProductBody {
        name: string;
        category: string;
      }
      export type Result = ProductSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends ProductBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = ProductSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = ProductSchema;
    }
  }

  export namespace Variant {
    export interface VariantSchema {
      _id: string;
      name: string;
      product: string | Product.ProductSchema;
      price: number;
      company_namespace: string[];
      disabled?: boolean;
      uuid?: string;
      local_name?: string;
      sku?: string;
      barcode?: string;
      weight?: number;
      length?: number;
      width?: number;
      height?: number;
      position?: number;
      default?: boolean;
      variant_img?: string;
      modifiers_groups?: string[];
      integration_meta?: { [key: string]: any };
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface VariantBody {
      name?: string;
      product?: string;
      price?: number;
      company_namespace?: string[];
      disabled?: boolean;
      uuid?: string;
      local_name?: string;
      sku?: string;
      barcode?: string;
      weight?: number;
      length?: number;
      width?: number;
      height?: number;
      position?: number;
      default?: boolean;
      variant_img?: string;
      modifiers_groups?: string[];
      integration_meta?: { [key: string]: any };
    }
    type PopulatedKeys = "product";

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        product?: string[] | string;
        barcode?: string[] | string;
        sku?: string[] | string;
        price?: number[] | number;
        position?: number[] | number;
        createdAt?: number;
        updatedAt?: number;
        default?: boolean;
        category?: string[] | string;
        subCategory?: string[] | string;
        brand?: string[] | string;
        productGroup?: string[] | string;
        teams?: string[] | string;
        withProduct?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: VariantSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = VariantSchema;
    }

    export namespace Create {
      export interface Body extends VariantBody {
        name: string;
        product: string;
        price: number;
      }
      export type Result = VariantSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends VariantBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = VariantSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = VariantSchema;
    }
  }

  export namespace Category {
    export interface CategorySchema {
      _id: string;
      type?: "main";
      name: string;
      photo?: string;
      local_name?: string;
      icon?: string;
      disabled?: boolean;
      position?: number;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface CategoryBody {
      name?: string;
      company_namespace?: string[];
      type?: "main";
      disabled?: boolean;
      photo?: string;
      local_name?: string;
      icon?: string;
      position?: number;
      integration_meta?: { [key: string]: any };
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        position?: number[] | number;
        createdAt?: number;
        updatedAt?: number;
        withProduct?: boolean;
        hasSubCategory?: boolean;
        isLeaf?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: (CategorySchema & {
          hasSubCategory?: boolean;
          isLeaf?: boolean;
        })[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = CategorySchema;
    }

    export namespace Create {
      export interface Body extends CategoryBody {
        name: string;
      }
      export type Result = CategorySchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends CategoryBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = CategorySchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = CategorySchema;
    }
  }

  export namespace Brand {
    export interface BrandSchema {
      _id: string;
      name: string;
      local_name?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface BrandBody {
      name?: string;
      company_namespace?: string[];
      disabled?: boolean;
      local_name?: string;
      integration_meta?: { [key: string]: any };
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        createdAt?: number;
        updatedAt?: number;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: BrandSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = BrandSchema;
    }

    export namespace Create {
      export interface Body extends BrandBody {
        name: string;
      }
      export type Result = BrandSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends BrandBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = BrandSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = BrandSchema;
    }
  }

  export namespace SubCategory {
    export interface SubCategorySchema {
      _id: string;
      name: string;
      parent_id: string | Pick<Category.CategorySchema, "_id" | "name">;
      local_name?: string;
      disabled?: boolean;
      photo?: string;
      position?: number;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface SubCategoryBody {
      name?: string;
      company_namespace?: string[];
      disabled?: boolean;
      local_name?: string;
      photo?: string;
      position?: number;
      parent_id?: string;
      integration_meta?: { [key: string]: any };
    }

    type PopulatedKeys = "parent_id";

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        populatedKeys?: PopulatedKeys[];
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        parent_id?: string[] | string;
        disabled?: boolean;
        position?: number | number[];
        createdAt?: number;
        updatedAt?: number;
        withProduct?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: SubCategorySchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = SubCategorySchema;
    }

    export namespace Create {
      export interface Body extends SubCategoryBody {
        name: string;
        parent_id: string;
      }
      export type Result = SubCategorySchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends SubCategoryBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = SubCategorySchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = SubCategorySchema;
    }
  }

  export namespace ProductGroup {
    export interface ProductGroupSchema {
      _id: string;
      name: string;
      local_name?: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface ProductGroupBody {
      name?: string;
      company_namespace?: string[];
      disabled?: boolean;
      local_name?: string;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        createdAt?: number;
        updatedAt?: number;
      };
      export interface Result extends DefaultPaginationResult {
        data: ProductGroupSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = ProductGroupSchema;
    }

    export namespace Create {
      export interface Body extends ProductGroupBody {
        name: string;
      }
      export type Result = ProductGroupSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends ProductGroupBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = ProductGroupSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = ProductGroupSchema;
    }
  }

  export namespace Tax {
    type TaxType = "inclusive" | "additive" | "N/A";
    export interface TaxSchema {
      _id: string;
      name: string;
      rate: number;
      type: TaxType;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface TaxBody {
      name?: string;
      rate?: number;
      type?: TaxType;
      company_namespace?: string[];
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        rate?: number | number[];
        type?: TaxType | TaxType[];
        disabled?: boolean;
        from_updatedAt?: number;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: TaxSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = TaxSchema;
    }

    export namespace Create {
      export interface Body extends TaxBody {
        name: string;
        rate: number;
        type: TaxType;
      }
      export type Result = TaxSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends TaxBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = TaxSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = TaxSchema;
    }
  }

  export namespace MeasureUnit {
    export interface MeasureUnitSchema {
      _id: string;
      name: string;
      factor: number;
      local_name?: string;
      parent?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface MeasureUnitBody {
      name?: string;
      factor: number;
      local_name?: string;
      parent?: string;
      company_namespace?: string[];
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        factor?: number | number[];
        parent?: "nil";
        disabled?: boolean;
        from_updatedAt?: number;
        family_name?: string[] | string;
        withFamily?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: (MeasureUnitSchema & {
          family?: MeasureUnitFamily.MeasureUnitFamilySchema[];
        })[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = MeasureUnitSchema;
    }

    export namespace Create {
      export interface Body extends MeasureUnitBody {
        name: string;
      }
      export type Result = MeasureUnitSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends MeasureUnitBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = MeasureUnitSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = MeasureUnitSchema;
    }
  }

  export namespace MeasureUnitFamily {
    export interface MeasureUnitFamilySchema {
      _id: string;
      name: string;
      local_name?: string;
      measureunits: string[];
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface MeasureUnitFamilyBody {
      name?: string;
      local_name?: string;
      measureunits?: string[];
      company_namespace?: string[];
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        measureunits?: string[] | string;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: MeasureUnitFamilySchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = MeasureUnitFamilySchema;
    }

    export namespace Create {
      export interface Body extends MeasureUnitFamilyBody {
        name: string;
      }
      export type Result = MeasureUnitFamilySchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends MeasureUnitFamilyBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = MeasureUnitFamilySchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = MeasureUnitFamilySchema;
    }
  }

  export namespace Media {
    type MediaType =
      | "ppt"
      | "pptx"
      | "pdf"
      | "jpeg"
      | "jpg"
      | "png"
      | "doc"
      | "docx";
    export interface MediaSchema {
      _id: string;
      name: string;
      type: MediaType;
      url: string;
      creator: AdminCreator | RepCreator;
      caption?: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface MediaBody {
      name?: string;
      type?: MediaType;
      url?: string[];
      caption?: string;
      company_namespace?: string[];
      disabled?: boolean;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        "creator._id"?: string[] | string;
        caption?: string[] | string;
        url?: string[] | string;
        type?: MediaType[] | MediaType;
        disabled?: boolean;
        repID?: string[] | string;
      };
      export interface Result extends DefaultPaginationResult {
        data: MediaSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = MediaSchema;
    }

    export namespace Create {
      export interface Body extends MediaBody {
        name: string;
      }
      export type Result = MediaSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends MediaBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = MediaSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = string;
    }
  }

  export namespace PriceList {
    interface creator {
      _id: string;
      name: string;
    }
    export interface PriceListSchema {
      _id: string;
      name: string;
      createdby: creator;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface PriceListBody {
      name?: string;
      integration_meta?: { [key: string]: any };
      disabled?: boolean;
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        "createdby._id"?: string[] | string;
        disabled?: boolean;
        from_updatedAt?: number;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: PriceListSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = PriceListSchema;
    }

    export namespace Create {
      export interface Body extends PriceListBody {
        name: string;
      }
      export type Result = PriceListSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends PriceListBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = PriceListSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = PriceListSchema;
    }
  }

  export namespace PriceListItem {
    export interface PriceListItemSchema {
      _id: string;
      product_id: string;
      variant_id: string;
      pricelist_id: string;
      price: number;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface PriceListItemBody {
      product_id?: string;
      variant_id?: string;
      pricelist_id?: string;
      price?: number;
      integration_meta?: { [key: string]: any };
      disabled?: boolean;
      company_namespace?: string[];
    }

    type PopulatedKeys = "product" | "variant" | "pricelist";

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        product_id?: string[] | string;
        variant_id?: string[] | string;
        pricelist_id?: string[] | string;
        disabled?: boolean;
        from_updatedAt?: number;
        populatedKeys?: PopulatedKeys[];
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: (PriceListItemSchema & {
          product_id: string | Product.ProductSchema;
          variant_id: string | Variant.VariantSchema;
          pricelist_id: string | PriceList.PriceListSchema;
        })[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = PriceListItemSchema;
    }

    export namespace Create {
      export interface Body extends PriceListItemBody {
        product_id: string;
        variant_id: string;
        pricelist_id: string;
        price: number;
      }
      export type Result = PriceListItemSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends PriceListItemBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = PriceListItemSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = PriceListItemSchema;
    }
  }

  export namespace Team {
    export interface TeamSchema {
      _id: string;
      name: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface TeamBody {
      name?: string;
      company_namespace?: string[];
      disabled?: boolean;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        disabled?: boolean;
      };
      export interface Result extends DefaultPaginationResult {
        data: TeamSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = TeamSchema & {
        admins: any; // Admin.Schema
        reps: any; // Rep.Schema
      };
    }

    export namespace Create {
      export interface Body extends TeamBody {
        name: string;
      }
      export type Result = TeamSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends TeamBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = TeamSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = TeamSchema;
    }
  }

  export namespace Rep {
    interface RepPermissions {
      rep_can_add_client: boolean;
      rep_can_edit_client: boolean;
      rep_can_add_calendar: boolean;
      rep_can_edit_calendar: boolean;
      rep_can_skip_photo_tag: boolean;
      rep_can_edit_product_price?: boolean;
      rep_must_add_client_with_location?: boolean;
      rep_can_access_shared_history?: boolean;
      rep_can_edit_total_shelf_share?: boolean;
      rep_can_create_transfer?: boolean;
      rep_can_make_call?: boolean;
      rep_can_read_stock?: boolean;
      can_rep_pay_other_reps_invoices?: boolean;
      rep_can_create_sales_order?: boolean;
      rep_can_create_invoice?: boolean;
      rep_can_create_transfer_load?: boolean;
      rep_can_create_transfer_unload?: boolean;
      rep_can_create_return_invoice?: boolean;
      rep_can_sell_zero_product_price?: boolean;
    }
    interface TargetResults {
      totalPoints: number;
      targetsCount: number;
      totalAchievements: number;
      averageAchievements: number;
      pointsCap: number;
    }
    type JobOption = 0 | 1 | 2;
    export interface RepSchema {
      _id: string;
      username: string;
      name: string;
      password: string;
      device_id?: string;
      linked_to_device?: boolean;
      live_location?: boolean;
      phone?: string;
      integration_id?: string;
      permissions: RepPermissions;
      preferences: {
        isLightModeEnabled?: boolean;
      };
      profile_pic?: string;
      teams?: string[];
      identifier?: number;
      notification_id?: string;
      monthly_sales_target?: number;
      daily_target_visit?: number;
      sales_type?: 1 | 2;
      job_option?: JobOption;
      msl_sales?: string[];
      job_category?: string[];
      assigned_warehouse?: string;
      assigned_main_warehouse?: string;
      assigned_plan?: string;
      integration_meta?: { [key: string]: any };
      force_online_connectivity?: boolean;
      assigned_targets?: string[];
      lines?: string[];
      targetResults?: TargetResults;
      previously_assigned_clients?: string[];
      freshchat_id?: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface RepBody {
      username?: string;
      name?: string;
      password?: string;
      device_id?: string;
      linked_to_device?: boolean;
      live_location?: boolean;
      phone?: string;
      integration_id?: string;
      permissions?: RepPermissions;
      preferences?: {
        isLightModeEnabled?: boolean;
      };
      profile_pic?: string;
      teams?: string[];
      identifier?: number;
      notification_id?: string;
      monthly_sales_target?: number;
      daily_target_visit?: number;
      sales_type?: 1 | 2;
      job_option?: JobOption;
      msl_sales?: string[];
      job_category?: string[];
      assigned_warehouse?: string;
      assigned_main_warehouse?: string;
      assigned_plan?: string;
      integration_meta?: { [key: string]: any };
      force_online_connectivity?: boolean;
      assigned_targets?: string[];
      lines?: string[];
      targetResults?: TargetResults;
      previously_assigned_clients?: string[];
      freshchat_id?: string;
      disabled?: boolean;
      company_namespace: string[];
    }

    type PopulatedKeys = "line" | "job_category";

    export type RepWithPopulatedKeysSchema = RepSchema & {
      lines?: string[] | Line.LineSchema[];
      job_category?: string[] | JobCategory.JobCategorySchema[];
    };

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        disabled?: boolean;
        createdAt?: number;
        updatedAt?: number;
        username?: string | string[];
        phone?: string | string[];
        teams?: string | string[];
        identifier?: number | number[];
        msl_sales?: string | string[];
        job_category?: string | string[];
        assigned_warehouse?: string | string[];
        assigned_main_warehouse?: string | string[];
        assigned_plan?: string | string[];
        force_online_connectivity?: boolean;
        assigned_targets?: string | string[];
        lines?: string | string[];
        job_option?: JobOption | JobOption[];
        "permissions.rep_can_add_client"?: boolean;
        "permissions.rep_can_edit_client"?: boolean;
        "permissions.rep_can_add_calendar"?: boolean;
        "permissions.rep_can_edit_calendar"?: boolean;
        "permissions.rep_can_skip_photo_tag"?: boolean;
        "permissions.rep_can_edit_product_price"?: boolean;
        "permissions.rep_must_add_client_with_location"?: boolean;
        "permissions.rep_can_access_shared_history"?: boolean;
        "permissions.rep_can_edit_total_shelf_share"?: boolean;
        "permissions.rep_can_create_transfer"?: boolean;
        "permissions.rep_can_make_call"?: boolean;
        "permissions.rep_can_read_stock"?: boolean;
        "permissions.can_rep_pay_other_reps_invoices"?: boolean;
        "permissions.rep_can_create_sales_order"?: boolean;
        "permissions.rep_can_create_invoice"?: boolean;
        "permissions.rep_can_create_transfer_load"?: boolean;
        "permissions.rep_can_create_transfer_unload"?: boolean;
        "permissions.rep_can_create_return_invoice"?: boolean;
        [key: string]: any; // integration_meta.
        populatedKeys?: PopulatedKeys[];
        withProductLines?: boolean;
        withStatus?: boolean;
      };
      export interface Result extends DefaultPaginationResult {
        data: (RepSchema & {
          status?:
            | "Inactive"
            | "Ended a day"
            | "Active"
            | "Visiting"
            | "Started a day";
          latest_activity?: string;
        })[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
        withProductLines?: boolean;
      }
      export type Result = RepSchema;
    }

    export namespace Create {
      export interface Body extends RepBody {
        name: string;
        username: string;
        password: string;
      }
      export type Result = RepSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends RepBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = RepSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = RepSchema;
    }
  }

  export namespace Line {
    export interface LineSchema {
      _id: string;
      name: string;
      local_name?: string;
      icon?: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }

  export namespace JobCategory {
    interface JobSchema {
      type: 0 | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9;
      description: string;
      tag?: string | Tag.TagSchema;
      product_id?: string;
      form_id?: string;
      msl_id?: string;
      is_required: boolean;
      order: number;
    }
    export interface JobCategorySchema {
      _id: string;
      en_name: string;
      ar_name?: string;
      from_date: number;
      end_date?: number;
      description?: string;
      deleted_at?: number;
      is_sequence: boolean;
      jobs: JobSchema[];
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }

  export namespace Tag {
    type TagType = "photo" | "client" | "area" | "price";
    export interface TagSchema {
      _id: string;
      type: TagType;
      tag: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface TagBody {
      tag?: string;
      type?: TagType;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        tag?: string[] | string;
        type?: TagType[] | TagType;
        disabled?: boolean;
        from_updatedAt?: number;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: TagSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = TagSchema;
    }

    export namespace Create {
      export interface Body extends TagBody {
        type: TagType;
        tag: string;
      }
      export type Result = TagSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends TagBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = TagSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = TagSchema;
    }
  }

  export namespace Warehouse {
    type WarehouseType = "van" | "main" | "origin";
    export interface WarehouseSchema {
      _id: string;
      type: WarehouseType;
      name: string;
      code?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface WarehouseBody {
      name?: string;
      type?: "van" | "main";
      code?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }
    type PopulatedKeys = "rep_id";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        code?: string[] | string;
        type?: WarehouseType[] | WarehouseType;
        disabled?: boolean;
        from_updatedAt?: number;
        [key: string]: any; // integration_meta.
        populatedKeys?: PopulatedKeys[];
      };
      export interface Result extends DefaultPaginationResult {
        data: (WarehouseSchema & {
          rep_id?: Pick<Rep.RepSchema, "_id" | "name">;
        })[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = WarehouseSchema;
    }

    export namespace Create {
      export interface Body extends WarehouseBody {
        name: string;
        type: "van" | "main";
      }
      export type Result = WarehouseSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends WarehouseBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = WarehouseSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = WarehouseSchema;
    }
  }

  export namespace Channel {
    export interface ChannelSchema {
      _id: string;
      name: string;
      local_name?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface ChannelBody {
      name?: string;
      local_name?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: ChannelSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = ChannelSchema;
    }

    export namespace Create {
      export interface Body extends ChannelBody {
        name: string;
      }
      export type Result = ChannelSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends ChannelBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = ChannelSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = ChannelSchema;
    }
  }

  export namespace PaymentTerm {
    export interface PaymentTermSchema {
      _id: string;
      name: string;
      due_days: number;
      editor: AdminCreator;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface PaymentTermBody {
      name?: string;
      due_days?: number;
      editor?: AdminCreator;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        disabled?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: PaymentTermSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = PaymentTermSchema;
    }

    export namespace Create {
      export interface Body extends PaymentTermBody {
        name: string;
        due_days: number;
      }
      export type Result = PaymentTermSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends PaymentTermBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = PaymentTermSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = PaymentTermSchema;
    }
  }

  export namespace Bank {
    export interface BankSchema {
      _id: string;
      name: string;
      country?: string[];
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface BankBody {
      name?: string;
      country?: string[];
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: BankSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = BankSchema;
    }

    export namespace Create {
      export interface Body extends BankBody {
        name: string;
      }
      export type Result = BankSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends BankBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = BankSchema;
    }
  }

  export namespace CustomStatus {
    type CustomStatusModel =
      | "proformas"
      | "fullinvoices"
      | "transfers"
      | "payments";
    export interface CustomStatusSchema {
      _id: string;
      name: string;
      code: string;
      model: CustomStatusModel;
      local_name?: string;
      is_default: boolean;
      color?: string;
      disabled?: boolean;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface CustomStatusBody {
      name?: string;
      code: string;
      model: CustomStatusModel;
      local_name?: string;
      is_default: boolean;
      color?: string;
      company_namespace?: string[];
      disabled?: boolean;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        code?: string[] | string;
        model?: CustomStatusModel | CustomStatusModel[];
        is_default?: boolean;
        color?: string[] | string;
        disabled?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: CustomStatusSchema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = CustomStatusSchema;
    }

    export namespace Create {
      export interface Body extends CustomStatusBody {
        name: string;
        model: CustomStatusModel;
      }
      export type Result = CustomStatusSchema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends CustomStatusBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = CustomStatusSchema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = CustomStatusSchema;
    }
  }

  export namespace ReturnReason {
    export interface Schema {
      _id: string;
      name: string;
      local_name?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface Data {
      name?: string;
      local_name?: string;
      disabled?: boolean;
      integration_meta?: { [key: string]: any };
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        local_name?: string[] | string;
        disabled?: boolean;
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: Schema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export type Result = Schema;
    }

    export namespace Create {
      export interface Body extends Data {
        name: string;
      }
      export type Result = Schema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends Data {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = Schema;
    }

    export namespace Remove {
      export type ID = string;
      export type Result = Schema;
    }
  }

  export namespace Promotion {
    interface CompoundSchema {
      manual_allocation?: boolean;
      appliedCount: number;
      sorting: "cheapest" | "expensive";
      enforcement_mode:
        | "all_in_inventory"
        | "all"
        | "gift_in_inventory"
        | "gift";
      calculate_hidden_price?: boolean;
      usage_limit?: number;
      usage_limit_per_rep?: number;
      usage_limit_per_client?: number;
      cart_filters_operator: "and" | "or";
      cart_filters: {
        _id: string;
        filter_type:
          | "product"
          | "category"
          | "sub_category"
          | "product_group"
          | "brand"
          | "variant"
          | "cart_total"
          | "items_count"
          | "client"
          | "tag"
          | "channel"
          | "distinct_variants_count"
          | "distinct_products_count"
          | "promotion";
        value: string[];
        operator: "lte" | "lt" | "gte" | "gt" | "eq";
        reject_if_pass?: boolean;
        limit_type: "count" | "price_amount";
        limit_value: number;
      }[];
      items_filters_operator: "and" | "or";
      items_filters: {
        _id: string;
        filter_type:
          | "product"
          | "category"
          | "sub_category"
          | "product_group"
          | "brand"
          | "variant"
          | "any";
        value: string[];
        limit_type: "count" | "price_amount";
        limit_value: number;
      }[];
      get_items_operator: "and" | "or";
      get_items: {
        _id: string;
        filter_type:
          | "product"
          | "category"
          | "sub_category"
          | "product_group"
          | "brand"
          | "variant"
          | "gift";
        value: string[];
        limit_type: "count";
        limit_value: number;
        discount_ratio: number;
      }[];
      cart_adjustments: {
        adjustment_type:
          | "discount_amount"
          | "discount_ratio"
          | "shipping_fixed_price"
          | "shipping_discount_amount"
          | "shipping_discount_ratio"
          | "tax_exempt";
        value: boolean | number;
      }[];
      line_filters: {
        _id: string;
        filter_type:
          | "product"
          | "category"
          | "sub_category"
          | "product_group"
          | "brand"
          | "variant"
          | "line_total"
          | "base_unit_qty"
          | "promotion";
        value: string[];
        operator: "lte" | "lt" | "gte" | "gt" | "eq";
        reject_if_pass?: boolean;
        limit_type: "count" | "price_amount";
        limit_value: number;
      }[];
      line_adjustments: {
        adjustment_type: "discount_amount" | "discount_ratio" | "fixed_price";
        value: number;
      }[];
      line_filters_operator: "and" | "or";
      is_bulk: { type: boolean; default: false };
      rounding: "round" | "floor" | "ceil";
      bulk_over_provide?: boolean;
      bulk_limit_type?: "count" | "price_amount" | "ratio";
      bulk_data: {
        _id: string;
        from_limit_value: number;
        to_limit_value?: number;
        get_limit_value: number;
      }[];
    }
    export interface Schema {
      _id: string;
      type: "compound";
      from: number;
      to: number;
      priority?: number;
      name: string;
      description?: string;
      duration?: number;
      startsAt?: string;
      disabled?: boolean;
      details: CompoundSchema;
      copied_from?: string;
      ref?: string;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }

  export namespace Item {
    interface Modifier {
      modifiers_group_id?: string;
      name?: string;
      local_name?: string;
      price?: number;
      position?: number;
      disabled?: boolean;
      company_namespace: string[];
      overwritePrice?: number;
      discounted_price?: number;
      tax_amount?: number;
      gross_value?: number;
    }
    export interface ModifierGroup {
      name?: string;
      local_name?: string;
      position?: number;
      disabled?: boolean;
      multiple_modifiers?: boolean;
      company_namespace: string[];
      modifiers?: Modifier[];
      group_total?: number;
      group_total_before_tax?: number;
      group_tax_total?: number;
    }
    export interface Item_Variant {
      product_id: string;
      product_name: string;
      variant_id: string;
      variant_name: string;
      listed_price: number;
      variant_local_name?: string;
      variant_img?: string;
      product_local_name?: string;
      product_img?: string;
      product_sku?: string;
      product_barcode?: string;
      variant_sku?: string;
      variant_barcode?: string;
    }
    export interface Schema {
      _id: string;
      variant: Item_Variant;
      measureunit: {
        _id: string;
        name: string;
        factor: number;
        parent?: string;
        disabled?: boolean;
        company_namespace: string[];
      };
      tax: {
        name: string;
        rate: number;
        type: "inclusive" | "additive" | "N/A";
        disabled?: boolean;
      };
      promotions?: Promotion.Schema[];
      used_promotions?: { id: string; name: string };
      general_promotions?: { id: string; name: string };
      applicable_promotions?: { id: string; name: string };
      modifiers_groups: ModifierGroup[];
      isAdditional?: boolean;
      qty: number;
      base_unit_qty?: number;
      overwritePrice?: number;
      price: number;
      discounted_price: number;
      tax_amount: number;
      tax_total: number;
      discount_value: number;
      gross_value?: number;
      line_total?: number;
      total_before_tax?: number;
      hidden_price?: number;
      modifiers_total?: number;
      modifiers_total_before_tax?: number;
      modifiers_tax_total?: number;
      tax_total_without_modifiers?: number;
      line_total_without_modifiers?: number;
      total_before_tax_without_modifiers?: number;
      deductionRatio?: number;
      deductedTax?: number;
      deduction?: number;
      deductionBeforeTax?: number;
      lineTotalAfterDeduction?: number;
      company_namespace: string[];
      class: "invoice" | "return";
      note?: string;
      return_reason?: string;
    }
    export interface Body {
      variant: Item_Variant;
      measureunit: {
        _id: string;
        name: string;
        factor: number;
        parent?: string;
        disabled?: boolean;
        company_namespace: string[];
      };
      tax: {
        name: string;
        rate: number;
        type: "inclusive" | "additive" | "N/A";
        disabled?: boolean;
      };
      promotions?: Promotion.Schema[];
      used_promotions?: { id: string; name: string };
      general_promotions?: { id: string; name: string };
      applicable_promotions?: { id: string; name: string };
      modifiers_groups?: ModifierGroup[];
      isAdditional?: boolean;
      qty: number;
      base_unit_qty?: number;
      overwritePrice?: number;
      price: number;
      discounted_price: number;
      tax_amount: number;
      tax_total: number;
      discount_value: number;
      gross_value?: number;
      line_total?: number;
      total_before_tax?: number;
      hidden_price?: number;
      modifiers_total?: number;
      modifiers_total_before_tax?: number;
      modifiers_tax_total?: number;
      tax_total_without_modifiers?: number;
      line_total_without_modifiers?: number;
      total_before_tax_without_modifiers?: number;
      deductionRatio?: number;
      deductedTax?: number;
      deduction?: number;
      deductionBeforeTax?: number;
      lineTotalAfterDeduction?: number;
      company_namespace?: string[];
      note?: string;
    }
  }

  export namespace FullInvoice {
    export interface InvoiceSchema {
      _id: string;
      items: Item.Schema[];
      return_items: Item.Schema[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      qr_code_tlv?: string;
      processable?: boolean;
      client_id: string;
      client_name: string;
      comment?: string;
      return_comment?: string;
      creator: AdminCreator | RepCreator | ClientCreator;
      latest?: boolean;
      version?: number;
      time?: number;
      issue_date: string;
      delivery_date?: string;
      currency: string;
      serial_number: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id: string;
      address?: { [key: string]: any };
      company_namespace: string[];
      promotions: Promotion.Schema[];
      priceLists: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      converter?: AdminCreator | RepCreator | ClientCreator;
      converted_proforma_serial_number?: SerialNumber;
      converted_proforma_return_serial_number?: SerialNumber;
      proforma_reference?: string;
      converted_at?: number;
      exclude_return_items?: boolean;
      returned_from?: string;
      returned_to?: string;
      returned_from_serial_number?: SerialNumber;
      returned_to_serial_number?: SerialNumber;
      is_void?: boolean;
      due_date: string;
      return_serial_number?: SerialNumber;
      origin_warehouse: string;
      route?: string;
      paymentsData: {
        _id: string;
        invoice_value: number;
        paid: number;
        balance: number;
        payments: PaymentData[];
      };
      consumption: {
        status: "consumed" | "unconsumed" | "partially_consumed";
        remainder: number;
      };
      status: InvoiceStatus;
      custom_status?: string;
      subtotal: number;
      discount_amount: number;
      taxable_subtotal: number;
      tax_amount: number;
      total: number;
      pre_subtotal: number;
      pre_discount_amount: number;
      pre_taxable_subtotal: number;
      pre_tax_amount: number;
      pre_total: number;
      return_subtotal: number;
      return_discount_amount: number;
      return_taxable_subtotal: number;
      return_tax_amount: number;
      return_total: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][]; // ??????
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
      payment?: { amount?: number };
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      items?: Item.Body[];
      return_items?: Item.Body[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      processable?: boolean;
      client_id: string;
      client_name: string;
      comment?: string;
      return_comment?: string;
      creator?: AdminCreator | RepCreator | ClientCreator;
      version?: number;
      time?: number;
      issue_date: string;
      delivery_date?: string;
      currency?: string;
      serial_number?: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id: string;
      address?: { [key: string]: any };
      company_namespace?: string[];
      promotions?: Promotion.Schema[];
      priceLists: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      due_date: string;
      return_serial_number?: SerialNumber;
      origin_warehouse: string;
      route?: string;
      custom_status?: string;
      subtotal: number;
      discount_amount: number;
      taxable_subtotal: number;
      tax_amount: number;
      total: number;
      pre_subtotal: number;
      pre_discount_amount: number;
      pre_taxable_subtotal: number;
      pre_tax_amount: number;
      pre_total: number;
      return_subtotal: number;
      return_discount_amount: number;
      return_taxable_subtotal: number;
      return_tax_amount: number;
      return_total: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][];
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
      payment?: { amount?: number };
    }
    interface UpdateBody {
      integration_meta?: { [key: string]: any };
      issue_date?: string;
    }

    type InvoiceSchemaWithPopulatedKeys = {
      _id: string;
      items: {
        variant: {
          product_name: string;
          variant_id: Pick<Variant.VariantSchema, "sku" | "_id" | "barcode">;
          product_id: Pick<Product.ProductSchema, "sku" | "_id" | "barcode">;
          variant_name: string;
          listed_price: number;
          variant_local_name?: string;
          variant_img?: string;
          product_local_name?: string;
          product_img?: string;
          product_sku?: string;
          product_barcode?: string;
          variant_sku?: string;
          variant_barcode?: string;
        };
        measureunit: {
          _id: string;
          name: string;
          factor: number;
          parent?: string;
          disabled?: boolean;
          company_namespace: string[];
        };
        tax: {
          name: string;
          rate: number;
          type: "inclusive" | "additive" | "N/A";
          disabled?: boolean;
        };
        promotions?: Promotion.Schema[];
        used_promotions?: { id: string; name: string };
        general_promotions?: { id: string; name: string };
        applicable_promotions?: { id: string; name: string };
        modifiers_groups?: Item.ModifierGroup[];
        isAdditional?: boolean;
        qty: number;
        base_unit_qty?: number;
        overwritePrice?: number;
        price: number;
        discounted_price: number;
        tax_amount: number;
        tax_total: number;
        discount_value: number;
        gross_value?: number;
        line_total?: number;
        total_before_tax?: number;
        hidden_price?: number;
        modifiers_total?: number;
        modifiers_total_before_tax?: number;
        modifiers_tax_total?: number;
        tax_total_without_modifiers?: number;
        line_total_without_modifiers?: number;
        total_before_tax_without_modifiers?: number;
        deductionRatio?: number;
        deductedTax?: number;
        deduction?: number;
        deductionBeforeTax?: number;
        lineTotalAfterDeduction?: number;
        company_namespace?: string[];
        note?: string;
      }[];
      return_items: {
        variant: {
          product_name: string;
          variant_id: Pick<Variant.VariantSchema, "sku" | "_id" | "barcode">;
          product_id: Pick<Product.ProductSchema, "sku" | "_id" | "barcode">;
          variant_name: string;
          listed_price: number;
          variant_local_name?: string;
          variant_img?: string;
          product_local_name?: string;
          product_img?: string;
          product_sku?: string;
          product_barcode?: string;
          variant_sku?: string;
          variant_barcode?: string;
        };
        measureunit: {
          _id: string;
          name: string;
          factor: number;
          parent?: string;
          disabled?: boolean;
          company_namespace: string[];
        };
        tax: {
          name: string;
          rate: number;
          type: "inclusive" | "additive" | "N/A";
          disabled?: boolean;
        };
        promotions?: Promotion.Schema[];
        used_promotions?: { id: string; name: string };
        general_promotions?: { id: string; name: string };
        applicable_promotions?: { id: string; name: string };
        modifiers_groups?: Item.ModifierGroup[];
        isAdditional?: boolean;
        qty: number;
        base_unit_qty?: number;
        overwritePrice?: number;
        price: number;
        discounted_price: number;
        tax_amount: number;
        tax_total: number;
        discount_value: number;
        gross_value?: number;
        line_total?: number;
        total_before_tax?: number;
        hidden_price?: number;
        modifiers_total?: number;
        modifiers_total_before_tax?: number;
        modifiers_tax_total?: number;
        tax_total_without_modifiers?: number;
        line_total_without_modifiers?: number;
        total_before_tax_without_modifiers?: number;
        deductionRatio?: number;
        deductedTax?: number;
        deduction?: number;
        deductionBeforeTax?: number;
        lineTotalAfterDeduction?: number;
        company_namespace?: string[];
        note?: string;
        return_reason?: string | ReturnReason.Schema;
      }[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      qr_code_tlv?: string;
      processable?: boolean;
      client_name: string;
      comment?: string;
      return_comment?: string;
      creator: AdminCreator | RepCreator | ClientCreator;
      latest?: boolean;
      version?: number;
      time?: number;
      issue_date: string;
      delivery_date?: string;
      currency: string;
      serial_number: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id: string;
      address?: { [key: string]: any };
      company_namespace: string[];
      promotions: Promotion.Schema[];
      priceLists: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      converter?: AdminCreator | RepCreator | ClientCreator;
      converted_proforma_serial_number?: SerialNumber;
      converted_proforma_return_serial_number?: SerialNumber;
      proforma_reference?: string;
      converted_at?: number;
      exclude_return_items?: boolean;
      returned_from?: string;
      returned_to?: string;
      returned_from_serial_number?: SerialNumber;
      returned_to_serial_number?: SerialNumber;
      is_void?: boolean;
      due_date: string;
      return_serial_number?: SerialNumber;
      origin_warehouse: string;
      route?: string;
      paymentsData: {
        _id: string;
        invoice_value: number;
        paid: number;
        balance: number;
        payments: PaymentData[];
      };
      consumption: {
        status: "consumed" | "unconsumed" | "partially_consumed";
        remainder: number;
      };
      status: InvoiceStatus;
      subtotal: number;
      discount_amount: number;
      taxable_subtotal: number;
      tax_amount: number;
      total: number;
      pre_subtotal: number;
      pre_discount_amount: number;
      pre_taxable_subtotal: number;
      pre_tax_amount: number;
      pre_total: number;
      return_subtotal: number;
      return_discount_amount: number;
      return_taxable_subtotal: number;
      return_tax_amount: number;
      return_total: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][]; // ??????
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
      payment?: { amount?: number };
      createdAt: string;
      updatedAt: string;
      __v: number;
      client_id?: string | Customer.CustomerSchema;
      custom_status?: string | CustomStatus.CustomStatusSchema;
    };

    type InvoiceStatus = "paid" | "unpaid" | "partially_paid";
    type PopulatedKeys =
      | "client"
      | "tax_number"
      | "custom_status"
      | "return_reason";
    type SortingKeys =
      | "line_total"
      | "product_name"
      | "variant_name"
      | "product_sku"
      | "product_barcode"
      | "variant_sku"
      | "variant_barcode";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        creator?: string[] | string;
        client_id?: string[] | string;
        clients?: string[] | string;
        from_issue_date?: number;
        to_issue_date?: number;
        origin_warehouse?: string[] | string;
        custom_status?: string[] | string;
        status?: InvoiceStatus | InvoiceStatus[];
        is_void: false;
        has_return?: boolean;
        [key: string]: any; // integration_meta.
        populatedKeys?: PopulatedKeys[];
        sortPage?: SortingKeys;
      };
      export interface Result extends DefaultPaginationResult {
        data: InvoiceSchemaWithPopulatedKeys[];
        absolute_total: number;
        page_total: number;
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
        sortPage?: SortingKeys;
      }
      export type Result = InvoiceSchemaWithPopulatedKeys;
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = InvoiceSchema;
    }

    export namespace Update {
      export type ID = string;
      export type Body = UpdateBody;
      export type Result = InvoiceSchema;
    }
  }

  export namespace Proforma {
    interface ProformaSchema {
      _id: string;
      items: Item.Schema[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      processable?: boolean;
      client_id: string;
      client_name: string;
      comment?: string;
      creator: AdminCreator | RepCreator | ClientCreator;
      latest: boolean;
      version?: number;
      time?: number;
      issue_date: string;
      delivery_date?: string;
      currency: string;
      serial_number: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id: string;
      address?: { [key: string]: any };
      company_namespace: string[];
      promotions: Promotion.Schema[];
      priceLists: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      converter?: AdminCreator | RepCreator | ClientCreator;
      invoice_reference?: string;
      converted_at?: number;
      route?: string;
      status: ProformaStatus;
      custom_status?: string;
      editor?: AdminCreator | RepCreator | ClientCreator;
      disabled: boolean;
      subtotal: number;
      discount_amount: number;
      taxable_subtotal: number;
      tax_amount: number;
      total: number;
      pre_subtotal?: number;
      pre_discount_amount?: number;
      pre_taxable_subtotal?: number;
      pre_tax_amount?: number;
      pre_total?: number;
      return_subtotal?: number;
      return_discount_amount?: number;
      return_taxable_subtotal?: number;
      return_tax_amount?: number;
      return_total?: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][];
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      items: Item.Schema[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      processable?: boolean;
      client_id: string;
      client_name: string;
      comment?: string;
      creator: AdminCreator | RepCreator | ClientCreator;
      version?: number;
      time?: number;
      issue_date: string;
      delivery_date?: string;
      currency?: string;
      serial_number?: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id: string;
      address?: { [key: string]: any };
      company_namespace?: string[];
      promotions?: Promotion.Schema[];
      priceLists?: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      route?: string;
      custom_status?: string;
      disabled?: boolean;
      subtotal: number;
      discount_amount: number;
      taxable_subtotal: number;
      tax_amount: number;
      total: number;
      pre_subtotal?: number;
      pre_discount_amount?: number;
      pre_taxable_subtotal?: number;
      pre_tax_amount?: number;
      pre_total?: number;
      return_subtotal?: number;
      return_discount_amount?: number;
      return_taxable_subtotal?: number;
      return_tax_amount?: number;
      return_total?: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][];
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
    }
    interface UpdateBody {
      _id?: string;
      items?: Item.Schema[];
      integration_meta?: { [key: string]: any };
      external_serial_number?: string;
      processable?: boolean;
      client_id?: string;
      client_name?: string;
      comment?: string;
      creator?: AdminCreator | RepCreator | ClientCreator;
      latest?: boolean;
      version?: number;
      time?: number;
      issue_date?: string;
      delivery_date?: string;
      currency?: string;
      serial_number?: SerialNumber;
      geo_tag?: {
        type: "Point";
        coordinates: number[];
      };
      sync_id?: string;
      address?: { [key: string]: any };
      company_namespace?: string[];
      promotions?: Promotion.Schema[];
      priceLists?: { [key: string]: any }[];
      visit_id?: string;
      teams?: string[];
      converter?: AdminCreator | RepCreator | ClientCreator;
      invoice_reference?: string;
      converted_at?: number;
      route?: string;
      status?: ProformaStatus;
      custom_status?: string;
      editor?: AdminCreator | RepCreator | ClientCreator;
      disabled?: boolean;
      subtotal?: number;
      discount_amount?: number;
      taxable_subtotal?: number;
      tax_amount?: number;
      total?: number;
      pre_subtotal?: number;
      pre_discount_amount?: number;
      pre_taxable_subtotal?: number;
      pre_tax_amount?: number;
      pre_total?: number;
      return_subtotal?: number;
      return_discount_amount?: number;
      return_taxable_subtotal?: number;
      return_tax_amount?: number;
      return_total?: number;
      deductionRatio?: number;
      deductionFixed?: number;
      totalDeductedTax?: number;
      totalDeduction?: number;
      totalDeductionBeforeTax?: number;
      totalAfterDeduction?: number;
      taxes?: { [key: string]: any };
      overwriteDeductionFixed?: number;
      overwriteTaxExempt?: boolean;
      tax_exempt?: boolean;
      overwriteDeductionRatio?: number;
      shipping_zone?: {
        geoData: {
          type: "Polygon";
          coordinates: number[][][];
        }[];
        name: string;
        local_name?: string;
        shipping_method?: {
          local_name?: string;
          name: string;
          rate?: number;
          tax?: string;
          description?: string;
          local_description?: string;
          company_namespace: string[];
        };
        note?: string;
        local_note?: string;
        country: string;
        reachable: boolean;
        company_namespace: string[];
      };
      payment_method?: {
        name: string;
        local_name?: string;
        fee?: number;
        rate?: number;
        type: "online" | "offline";
        company_namespace: string[];
      };
      shipping_price?: number;
      shipping_tax?: number;
      shipping_charge?: number;
      payment_charge?: number;
      total_with_charges?: number;
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
    }

    type ProformaSchemaWithPopulatedKeys = ProformaSchema & {
      items: (Item.Body & {
        variant: Item.Item_Variant & {
          variant_sku?: string;
          product_sku?: string;
          variant_barcode?: string;
          product_barcode?: string;
        };
      })[];
      client_id?: string | Customer.CustomerSchema;
      custom_status?: string | CustomStatus.CustomStatusSchema;
      cycle?: Cycle.Schema;
    };
    type PopulatedKeys = "custom_status";
    type ProformaStatus = "pending" | "approved" | "processing" | "rejected";
    type SortingKeys =
      | "product_sku"
      | "product_barcode"
      | "variant_name"
      | "product_name"
      | "variant_sku"
      | "variant_barcode";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        creator?: string[] | string;
        clients?: string[] | string;
        disabled?: boolean;
        latest?: boolean;
        "serial_number.formatted"?: string[] | string;
        client_id?: string[] | string;
        from_issue_date?: number;
        to_issue_date?: number;
        from_time?: number;
        to_time?: number;
        from_createdAt?: number;
        to_createdAt?: number;
        from_updatedAt?: number;
        to_updatedAt?: number;
        custom_status?: string[] | string;
        status?: ProformaStatus | ProformaStatus[];
        [key: string]: any; // integration_meta.
        sortPage?: SortingKeys;
        export?: "excel";
        withClientDetails?: boolean;
        populatedKeys?: PopulatedKeys[];
        nodeCycles?: string[] | string;
        withCycle?: boolean;
      };
      export interface Result extends DefaultPaginationResult {
        data: ProformaSchemaWithPopulatedKeys[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        sortPage?: SortingKeys;
        withClientDetails?: boolean;
        withCycle?: boolean;
      }
      export type Result =
        | (ProformaSchemaWithPopulatedKeys & {
            custom_status: CustomStatus.CustomStatusSchema;
          })
        | {
            proforma: ProformaSchemaWithPopulatedKeys & {
              custom_status: CustomStatus.CustomStatusSchema;
            };
            cycle: Cycle.Schema & {
              can_edit: boolean;
              current_nodes: string[];
            };
          };
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = ProformaSchema;
    }

    export namespace Update {
      export type ID = string;
      export type Body = UpdateBody;
      export type Result = ProformaSchema;
    }
  }

  export namespace Payment {
    export interface PaymentSchema {
      _id: string;
      status: PaymentStatus;
      remainder: number;
      amount: number;
      client_id: string;
      client_name: string;
      creator: AdminCreator | RepCreator;
      time?: number;
      serial_number: SerialNumber;
      route?: string;
      paytime: string;
      note?: string;
      currency: string;
      payment_type: PaymentType;
      check?: Check;
      LinkedTxn?: {
        Txn_serial_number: SerialNumber;
        Txn_invoice_total: number;
        TxnType: "refund" | "invoice";
      };
      company_namespace: string[];
      integration_meta?: { [key: string]: any };
      sync_id: string;
      custom_status?: string;
      visit_id?: string;
      teams?: string[];
      paymentsData: {
        amount: number;
        paid: number;
        balance: number;
        payments: PaymentData[];
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      amount: number;
      client_id: string;
      client_name: string;
      time?: number;
      serial_number?: SerialNumber;
      route?: string;
      paytime: string;
      note?: string;
      currency: string;
      payment_type: PaymentType;
      check?: Check;
      LinkedTxn?: {
        Txn_serial_number: SerialNumber;
        Txn_invoice_total: number;
        TxnType: "refund" | "invoice";
      };
      company_namespace?: string[];
      integration_meta?: { [key: string]: any };
      sync_id: string;
      custom_status?: string;
      visit_id?: string;
      teams?: string[];
    }
    interface UpdateBody {
      integration_meta?: { [key: string]: any };
    }

    type PaymentSchemaWithPopulatedKeys = PaymentSchema & {
      balance_to_refund: number;
      custom_status?: string | CustomStatus.CustomStatusSchema;
      check?: Check & { bank: Bank.BankSchema };
      invoice?: {
        invoice_serial_number: string;
        invoice_date: string;
        invoice_due_date: string;
        original_amount: number;
        payment: number;
      };
    };
    type PaymentType = "check" | "cash";
    type PopulatedKeys = "custom_status";
    type PaymentStatus = "consumed" | "unconsumed" | "partially_consumed";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        client_id?: string[] | string;
        from_paytime?: number;
        to_paytime?: number;
        custom_status?: string[] | string;
        payment_type?: PaymentType | PaymentType[];
        creator?: string[] | string;
        clients?: string[] | string;
        withPrintDetails?: boolean;
        [key: string]: any; // integration_meta.
        populatedKeys?: PopulatedKeys[];
      };
      export interface Result extends DefaultPaginationResult {
        data: PaymentSchemaWithPopulatedKeys[];
        absolute_total: number;
        page_total: number;
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        withPrintDetails?: boolean;
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = PaymentSchemaWithPopulatedKeys & {
        custom_status: CustomStatus.CustomStatusSchema;
      };
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = PaymentSchema;
    }

    export namespace Update {
      export type ID = string;
      export type Body = UpdateBody;
      export type Result = PaymentSchema;
    }
  }

  export namespace Refund {
    export interface RefundSchema {
      _id: string;
      status: RefundStatus;
      remainder: number;
      amount: number;
      client_id: string;
      client_name: string;
      creator: AdminCreator | RepCreator;
      time?: number;
      serial_number: SerialNumber;
      route?: string;
      paytime: string;
      note?: string;
      currency: string;
      transaction_type: RefundType;
      check?: Check;
      LinkedTxn?: {
        Txn_serial_number: SerialNumber;
        Txn_invoice_total: number;
        TxnType: "return_invoice" | "payment" | "invoice";
      };
      company_namespace: string[];
      integration_meta?: { [key: string]: any };
      sync_id: string;
      custom_status?: string;
      visit_id?: string;
      teams?: string[];
      paymentsData: {
        amount: number;
        paid: number;
        balance: number;
        payments: PaymentData[];
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      amount: number;
      client_id: string;
      client_name: string;
      time?: number;
      serial_number?: SerialNumber;
      route?: string;
      paytime: string;
      note?: string;
      currency: string;
      transaction_type: RefundType;
      check?: Check;
      LinkedTxn?: {
        Txn_serial_number: SerialNumber;
        Txn_invoice_total: number;
        TxnType: "return_invoice" | "payment" | "invoice";
      };
      company_namespace?: string[];
      integration_meta?: { [key: string]: any };
      sync_id: string;
      custom_status?: string;
      visit_id?: string;
      teams?: string[];
    }
    interface UpdateBody {
      integration_meta?: { [key: string]: any };
    }

    type RefundSchemaWithPopulatedKeys = RefundSchema & {
      balance_to_refund: number;
      custom_status?: string | CustomStatus.CustomStatusSchema;
      check?: Check & { bank: Bank.BankSchema };
      invoice?: {
        invoice_serial_number: string;
        invoice_date: string;
        invoice_due_date: string;
        original_amount: number;
        refund: number;
      };
    };
    type RefundType = "check" | "cash";
    type PopulatedKeys = "custom_status";
    type RefundStatus = "consumed" | "unconsumed" | "partially_consumed";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        client_id?: string[] | string;
        from_paytime?: number;
        to_paytime?: number;
        custom_status?: string[] | string;
        transaction_type?: RefundType | RefundType[];
        creator?: string[] | string;
        clients?: string[] | string;
        withPrintDetails?: boolean;
        [key: string]: any; // integration_meta.
        populatedKeys?: PopulatedKeys[];
      };
      export interface Result extends DefaultPaginationResult {
        data: RefundSchemaWithPopulatedKeys[];
        absolute_total: number;
        page_total: number;
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        withPrintDetails?: boolean;
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = RefundSchemaWithPopulatedKeys & {
        custom_status: CustomStatus.CustomStatusSchema;
      };
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = RefundSchema;
    }

    export namespace Update {
      export type ID = string;
      export type Body = UpdateBody;
      export type Result = RefundSchema;
    }
  }

  export namespace Cycle {
    type CycleStatus = "pending" | "approved" | "processing" | "rejected";
    export interface Schema {
      _id: string;
      document_type: "proforma" | "transfer";
      document_id: string;
      status: CycleStatus;
      node?: AdminCreator | RepCreator | ClientCreator;
      creator?: AdminCreator | RepCreator | ClientCreator;
      current_nodes: {
        admin: string;
        admin_name: string;
      }[];
      stage?: number;
      stageName?: string;
      company_namespace: string[];
      note?: string;
      serial_number: SerialNumber;
      version: number;
      history: {
        _id: string;
        status: CycleStatus;
        stage: number;
        stageName: string;
        node: AdminCreator | RepCreator | ClientCreator;
        creator: AdminCreator | RepCreator | ClientCreator;
        note: string;
        serial_number: SerialNumber;
        version?: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }

  export namespace Transfer {
    export interface VariantTransfer {
      variant_id: string;
      variant_name?: string;
      product_id?: string;
      product_name?: string;
      qty: number;
      measure_unit_id?: string;
      measure_unit_name?: string;
      measure_unit_qty?: number;
      measure_unit_factor?: number;
    }
    export interface Schema {
      _id: string;
      serial_number: SerialNumber;
      time: number;
      creator: AdminCreator | RepCreator;
      type: TransferType;
      from: string;
      to: string;
      status: TransferStatus;
      variants: VariantTransfer[];
      items_count?: number;
      total_items_base_unit_qty?: number;
      teams?: string[];
      custom_status?: string;
      sync_id: string;
      integration_meta?: { [key: string]: any };
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      serial_number?: SerialNumber;
      time: number;
      type?: TransferType;
      from: string;
      to: string;
      variants: {
        variant_id: string;
        variant_name?: string;
        product_id?: string;
        product_name?: string;
        qty: number;
        measureunit?: {
          _id: string;
          name: string;
          factor: number;
          [key: string]: any;
        };
      }[];
      custom_status?: string;
      sync_id: string;
      integration_meta?: { [key: string]: any };
    }
    type UpdateBody =
      | {
          _id?: string;
          serial_number?: SerialNumber;
          time?: number;
          creator?: AdminCreator | RepCreator;
          type?: TransferType;
          from?: string;
          to?: string;
          status?: "pending" | "approved" | "processing" | "rejected";
          variants?: (
            | VariantTransfer
            | {
                variant_id: string;
                variant_name?: string;
                product_id?: string;
                product_name?: string;
                qty: number;
                measureunit?: {
                  _id: string;
                  name: string;
                  factor: number;
                  [key: string]: any;
                };
              }
          )[];
          items_count?: number;
          total_items_base_unit_qty?: number;
          teams?: string[];
          custom_status?: string;
          sync_id?: string;
          integration_meta?: { [key: string]: any };
          company_namespace?: string[];
          createdAt?: string;
          updatedAt?: string;
          __v?: number;
        }
      | {
          integration_meta?: { [key: string]: any };
        };

    type FindResult = Schema & {
      custom_status?: string | CustomStatus.CustomStatusSchema;
      from: Warehouse.WarehouseSchema;
      to: Warehouse.WarehouseSchema;
      variants: {
        _id: string;
        variant_id: string;
        product_id: string;
        variant_name: string;
        product_name: string;
        qty: number;
        measure_unit_id?: string;
        measure_unit_name?: string;
        measure_unit_qty?: number;
        measure_unit_factor?: number;
        UpdatedAt: string;
      }[];
    };
    type GetResult = FindResult & {
      custom_status: CustomStatus.CustomStatusSchema & {
        variants: {
          _id: string;
          variant_id: string;
          product_id: string;
          variant_name: string;
          product_name: string;
          qty: number;
          measure_unit_id?: string;
          measure_unit_name?: string;
          measure_unit_qty?: number;
          measure_unit_factor?: number;
          UpdatedAt: string;
          qty_from_before?: number;
          qty_from_after?: number;
          qty_to_before?: number;
          qty_to_after?: number;
        }[];
      };
    };
    type TransferType = "load" | "unload";
    type PopulatedKeys = "custom_status";
    type TransferStatus =
      | "pending"
      | "approved"
      | "processing"
      | "rejected"
      | "processed";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        "creator.name"?: string[] | string;
        "creator.type"?: string[] | string;
        type?: TransferType[] | TransferType;
        to?: string[] | string;
        from?: string[] | string;
        from_createdAt?: number;
        to_createdAt?: number;
        status?: TransferStatus | TransferStatus[];
        custom_status?: string[] | string;
        creator?: string[] | string;
        nodeCycles?: string[] | string;
        populatedKeys?: PopulatedKeys[];
        [key: string]: any; // integration_meta.
      };
      export interface Result extends DefaultPaginationResult {
        data: FindResult[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
        withCycle?: boolean;
      }
      export type Result =
        | GetResult
        | {
            transfer: GetResult & {
              can_edit: boolean;
              current_nodes: string[];
            };
            cycle: Cycle.Schema;
          };
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = Schema;
    }

    export namespace Update {
      export type ID = string;
      export type Body = UpdateBody;
      export type Result = Schema;
    }
  }

  export namespace AdjustAccount {
    interface VariantOfAdjustAccount {
      variant: string;
      variant_name?: string;
      product_id?: string;
      product_name?: string;
      qty: number;
    }
    interface Schema {
      _id: string;
      serial_number: SerialNumber;
      time: number;
      creator: AdminCreator | RepCreator;
      from: string;
      to: string;
      variants: VariantOfAdjustAccount[];
      teams?: string[];
      sync_id: string;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface CreateBody {
      serial_number?: SerialNumber;
      time: number;
      creator?: AdminCreator | RepCreator;
      to: string;
      variants: VariantOfAdjustAccount[];
      teams?: string[];
      sync_id: string;
      company_namespace?: string[];
    }

    type FindResult = Schema & {
      from: string | Warehouse.WarehouseSchema;
      to: string | Warehouse.WarehouseSchema;
      variants: (VariantOfAdjustAccount & {
        variant:
          | string
          | {
              _id: string;
              name: string;
              product: {
                _id: string;
                name: string;
              };
            };
      })[];
    };
    type GetResult = Schema & {
      from: string | Warehouse.WarehouseSchema;
      to: string | Warehouse.WarehouseSchema;
      variants: (VariantOfAdjustAccount & {
        variant: {
          _id: string;
          name: string;
          product: {
            _id: string;
            name: string;
          };
        };
      })[];
    };

    type PopulatedKeys = "warehouse" | "variant";
    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        "creator._id"?: string[] | string;
        "creator.name"?: string[] | string;
        "creator.type"?: string[] | string;
        to?: string[] | string;
        from?: string[] | string;
        from_createdAt?: number;
        to_createdAt?: number;
        creator?: string[] | string;
        populatedKeys?: PopulatedKeys[];
      };
      export interface Result extends DefaultPaginationResult {
        data: FindResult[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
      export type Result =
        | GetResult
        | {
            transfer: GetResult & {
              can_edit: boolean;
              current_nodes: string[];
            };
            cycle: Cycle.Schema;
          };
    }

    export namespace Create {
      export type Body = CreateBody;
      export type Result = Schema;
    }
  }

  export namespace Inventory {
    export interface InventorySchema {
      _id: string;
      warehouse_id: string;
      warehouse_name: string;
      variant_id: string;
      variant_name: string;
      product_id: string;
      product_name: string;
      listed_price: number;
      qty: number;
      UpdatedAt: string;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        warehouse_id?: string[] | string;
        variant_id?: string[] | string;
        rep?: string[] | string;
        qty?: number[] | number;
        from_updatedAt?: number;
        export_behaviour?: boolean;
      };
      export interface Result extends DefaultPaginationResult {
        data: InventorySchema[];
      }
    }
  }

  export namespace ActionLogs {
    export type Status = "success" | "fail" | "processing";
    export type Detail = {
      timestamp: number;
      content: string;
      meta?: { [key: string]: any };
    };
    export interface Schema {
      _id: string;
      available_app_name: string;
      available_app_id: string;
      app_id: string;
      sync_id: string;
      action: string;
      status: Status;
      error?: { [key: string]: any } | { [key: string]: any }[];
      start_time: number;
      end_time?: number;
      total_time?: number;
      company_namespace: string[];
      body?: { [key: string]: any };
      meta?: { [key: string]: any };
      message: string;
      details: Detail[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }

    interface Data {
      available_app_name: string;
      available_app_id: string;
      app_id: string;
      sync_id?: string;
      action: string;
      status: Status;
      error?: { [key: string]: any } | { [key: string]: any }[];
      start_time: number;
      end_time?: number;
      total_time?: number;
      company_namespace?: string[];
      body?: { [key: string]: any };
      meta?: { [key: string]: any };
      message: string;
      details: Detail[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        available_app_name?: string[] | string;
        available_app_id?: string[] | string;
        app_id?: string[] | string;
        action?: string[] | string;
        status?: Status[] | Status;
        sync_id?: string[] | string;
        disabled?: boolean;
        start_time?: number;
        end_time?: number;
        total_time?: number;
      };
      export interface Result extends DefaultPaginationResult {
        data: Schema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        available_app_name?: string[] | string;
        available_app_id?: string[] | string;
        app_id?: string[] | string;
        action?: string[] | string;
        status?: Status[] | Status;
        sync_id?: string[] | string;
        disabled?: boolean;
        start_time?: number;
        end_time?: number;
        total_time?: number;
      }
      export type Result = Schema;
    }

    export namespace Create {
      export type Body = Data;
      export type Result = Schema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends Data {
        _id?: string;
        sync_id: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = Schema;
    }
  }

  export namespace CommandLog {
    export type Status =
      | "success"
      | "fail"
      | "processing"
      | "queued"
      | "received"
      | "skipped";
    export type Detail = {
      timestamp: number;
      content: string;
      meta?: { [key: string]: any };
    };
    export interface Schema {
      _id: string;
      command: string;
      available_app_name: string;
      available_app_id: string;
      app_id: string;
      status: Status;
      error?: { [key: string]: any } | { [key: string]: any }[];
      start_time: number;
      end_time?: number;
      total_time?: number;
      company_namespace: string[];
      body?: { [key: string]: any };
      meta?: { [key: string]: any };
      message: string;
      details: Detail[];
      sync_id: string;
      queuedAt?: Date;
      failedAt?: Date;
      succeededAt?: Date;
      skippedAt?: Date;
      receivedAt?: Date;
      processedAt?: Date;
      onGoing?: boolean;
      retries?: number;
      trigger?: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }

    interface Data {
      command: string;
      available_app_name: string;
      available_app_id: string;
      app_id: string;
      status: Status;
      error?: { [key: string]: any } | { [key: string]: any }[];
      start_time: number;
      end_time?: number;
      total_time?: number;
      company_namespace: string[];
      body?: { [key: string]: any };
      meta?: { [key: string]: any };
      message: string;
      details: Detail[];
      sync_id?: string;
      queuedAt?: Date;
      failedAt?: Date;
      succeededAt?: Date;
      skippedAt?: Date;
      receivedAt?: Date;
      processedAt?: Date;
      onGoing?: boolean;
      retries?: number;
      trigger?: string;
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        available_app_name?: string[] | string;
        available_app_id?: string[] | string;
        app_id?: string[] | string;
        command?: string[] | string;
        status?: Status[] | Status;
        sync_id?: string[] | string;
        disabled?: boolean;
        start_time?: number;
        end_time?: number;
        total_time?: number;
      };
      export interface Result extends DefaultPaginationResult {
        data: Schema[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        available_app_name?: string[] | string;
        available_app_id?: string[] | string;
        app_id?: string[] | string;
        command?: string[] | string;
        status?: Status[] | Status;
        sync_id?: string[] | string;
        disabled?: boolean;
        start_time?: number;
        end_time?: number;
        total_time?: number;
      }
      export type Result = Schema;
    }

    export namespace Create {
      export type Body = Data;
      export type Result = Schema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends Data {
        _id?: string;
        sync_id: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = Schema;
    }
  }
  export namespace JoinActionsWeHook {
    interface JoinData {
      app: string;
      action: string;
      event: string;
      join: boolean;
    }
    export interface Result {
      data: JoinData[];
      status?: "success" | "failure";
      error?: any;
    }
    export interface Data {
      data: JoinData[];
    }
  }
  export namespace App {
    export interface Schema {
      _id: string;
      name: string;
      disabled?: boolean;
      available_app: string;
      formData: any;
      options_formData?: any;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    export interface Schema_with_populated_AvailableApp {
      _id: string;
      name: string;
      disabled?: boolean;
      available_app: AvailableApp;
      formData: any;
      options_formData?: any;
      company_namespace: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    }

    type PopulatedKeys = "available_app";

    export interface AppBody {
      name?: string;
      disabled?: boolean;
      available_app?: string;
      formData?: any;
      options_formData?: any;
      company_namespace?: string[];
    }

    export namespace Find {
      export type Params = DefaultPaginationQueryParams & {
        _id?: string[] | string;
        search?: string;
        name?: string[] | string;
        disabled?: boolean;
        populatedKeys?: PopulatedKeys[];
      };
      export interface Result extends DefaultPaginationResult {
        data: (Schema | Schema_with_populated_AvailableApp)[];
      }
    }

    export namespace Get {
      export type ID = string;
      export interface Params {
        populatedKeys?: PopulatedKeys[];
      }
      export type Result = Schema | Schema_with_populated_AvailableApp;
    }

    export namespace Create {
      export interface Body extends AppBody {
        name: string;
        available_app: string;
        formData: any;
      }
      export type Result = Schema;
    }

    export namespace Update {
      export type ID = string;
      export interface Body extends AppBody {
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      }
      export type Result = Schema;
    }
  }

  export interface AvailableApp {
    _id: StringId;
    name: string;
    disabled: boolean;
    JSONSchema: any;
    UISchema: any;
    app_settings: { repo: string; serviceEndPoint: string; meta: {} };
    app_category: string;
  }
}

export type StringId = string;
export type NameSpaces = string[];
