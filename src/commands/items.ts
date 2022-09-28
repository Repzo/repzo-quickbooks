import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/item";
import QuickBooks from "../quickbooks/index.js";

var result: Result = {
  QuickBooks_total: 0,
  repzo_total: 0,
  created: 0,
  updated: 0,
  failed: 0,
};

export const items = async (commandEvent: CommandEvent): Promise<Result> => {
  try {
    // init Repzo object
    const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
      env: commandEvent.env,
    });
    // init commandLog
    const commandLog = new Repzo.CommandLog(
      repzo,
      commandEvent.app,
      commandEvent.command
    );
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: commandEvent.oauth2_data?.access_token,
      realmId: commandEvent.oauth2_data?.realmId,
      sandbox: true,
    });

    // sync_products_from_QuickBooks_to_repzo
    let res = await sync_products_from_QuickBooks_to_repzo(
      repzo,
      qbo,
      commandEvent.app.formData?.bench_time_client
    );

    await commandLog
      .setStatus("success")
      .setBody("Complete Sync QuickBooks custommers to Repzo")
      .commit();
    return res;
  } catch (err) {
    console.error(err);
    return result;
  }
};

const sync_products_from_QuickBooks_to_repzo = async (
  repzo: Repzo,
  qb: QuickBooks,
  bench_time_client: string
): Promise<Result> => {
  try {
    const qb_items = await get_all_QuickBooks_items(qb, "Inventory", 1000);
    let repzo_products = await get_all_repzo_products(repzo);
    result.QuickBooks_total = qb_items.QueryResponse.Item.length;
    result.repzo_total = repzo_products.length;
    repzo_products = repzo_products.filter(
      (i) => i.integration_meta?.QuickBooks_id !== undefined
    );

    qb_items.QueryResponse.Item.forEach(async (item) => {
      const repzo_default_category = await get_repzo_default_category(
        repzo,
        item.ParentRef?.name
      );

      let existProduct = repzo_products.filter(
        (i) => i.integration_meta?.QuickBooks_id === item.Id
      );
      if (existProduct[0]) {
        if (
          new Date(existProduct[0]?.integration_meta?.QuickBooks_last_sync) <
          new Date(item.MetaData?.LastUpdatedTime)
        ) {
          try {
            console.log(
              `update repzo product id -- ${existProduct[0]._id} ...`
            );
            let repzo_product = map_products(item, repzo_default_category._id);
            await repzo.product.update(existProduct[0]._id, repzo_product);
            result["updated"] = result["updated"] + 1 || 1;
          } catch (err) {
            console.error(err);
            result["failed"] = result["failed"] + 1 || 1;
          }
        }
      } else {
        //create a new  repzo client
        try {
          console.log(`create a new repzo product name -- ${item.Name} ...`);
          let repzo_product = map_products(item, repzo_default_category._id);
          await repzo.product.create(repzo_product);
          result["created"] = result["created"] + 1 || 1;
        } catch (err) {
          console.error(err);
          result["failed"] = result["failed"] + 1 || 1;
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
  return result;
};

const get_all_repzo_products = async (
  repzo: Repzo
): Promise<Service.Product.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_products: any[];
    repzo_products = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.product.find({
        page: 1,
        per_page,
        disabled: false,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_products = [...repzo_products, ...repzoObj.data];
    }
    return repzo_products;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const get_repzo_default_category = async (
  repzo: Repzo,
  name: string | undefined
): Promise<Service.Category.Get.Result> => {
  try {
    if (name) {
      let repzoObj = await repzo.category.find({
        name,
        disabled: false,
      });
      if (repzoObj.data[0]) {
        return repzoObj.data[0];
      } else {
        return await repzo.category.create({
          name: "default",
          local_name: "Created by Quickbooks",
        });
      }
    } else {
      let repzoObj = await repzo.category.find({
        name: "default",
        disabled: false,
      });
      if (repzoObj.data[0]) {
        return repzoObj.data[0];
      } else {
        return await repzo.category.create({
          name: "default",
          local_name: "Created by Quickbooks",
        });
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const get_all_QuickBooks_items = async (
  qb: QuickBooks,
  type: string,
  maxresults: number = 1
): Promise<Item.Find.Result> => {
  try {
    const qb_items = await qb.item.query({
      query: `select * from Item where Type='${type}' maxresults ${maxresults}`,
    });
    return qb_items;
  } catch (err) {
    throw err;
  }
};

const map_products = (
  item: Item.itemObject,
  categoryID: string
): Service.Product.Create.Body => {
  return {
    name: item.Name,
    description: item.Description,
    active: item.Active,
    sku: item.Sku,
    local_name: item.FullyQualifiedName,
    base_price: item.UnitPrice ? String(Math.round(item.UnitPrice * 1000)) : "",
    category: categoryID,
    variants: [
      {
        default: true,
        disabled: false,
        name: item.Name,
        price: item.UnitPrice ? Math.round(item.UnitPrice * 1000) : 0,
      },
    ],
    integration_meta: {
      QuickBooks_id: item.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
