import { CommandEvent } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Item } from "../quickbooks/types/item";
import QuickBooks from "../quickbooks/index.js";
import _test from "../tests/forms/token_example.js";

export const items = async (commandEvent: CommandEvent) => {
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
      oauthToken: _test.access_token,
      realmId: _test.realmId,
      sandbox: true,
    });

    // sync_products_from_QuickBooks_to_repzo
    await sync_products_from_QuickBooks_to_repzo(
      repzo,
      qbo,
      commandEvent.app.formData?.bench_time_client
    );

    await commandLog
      .setStatus("success")
      .setBody("Complete Sync QuickBooks custommers to Repzo")
      .commit();
  } catch (err) {
    console.error(err);
  }
};

const sync_products_from_QuickBooks_to_repzo = async (
  repzo: Repzo,
  qb: QuickBooks,
  bench_time_client: string
) => {
  try {
    let repzo_categories = await get_all_repzo_categories(repzo);
    const qb_categories = await get_all_QuickBooks_categories(qb);

    const qb_items = await get_all_QuickBooks_items(qb, 2);
    let repzo_products = await get_all_repzo_products(repzo);

    console.dir(repzo_categories, { depth: null });
    console.dir(repzo_products, { depth: null });

    console.dir(qb_categories, { depth: null });
    console.dir(qb_items, { depth: null });
    // repzo_client = repzo_client.filter(
    //   (i) => i.integration_meta?.QuickBooks_id !== undefined
    // );

    /*
    qb_products.QueryResponse.Customer.forEach(async (cutomer) => {
      let existClient = repzo_client.filter(
        (i) =>
          i.integration_meta?.QuickBooks_id === cutomer.Id ||
          i.client_code === `QB_${cutomer.Id}`
      );
      if (
        existClient[0]?.integration_meta?.QuickBooks_last_sync >
        cutomer.MetaData.LastUpdatedTime
      ) {
        try {
          console.log(`update repzo client id -- ${existClient[0]._id} ...`);
          let repzo_client = map_products(cutomer);
          await repzo.client.update(existClient[0]._id, repzo_client);
        } catch (err) {
          console.error(err);
        }
      } else {
        //create a new  repzo client
        try {
          console.log(
            `create a new repzo client name -- ${cutomer.GivenName} ...`
          );
          let repzo_client = map_products(cutomer);
          await repzo.client.create({
            client_code: `QB_${cutomer.Id}`,
            ...repzo_client,
          });
        } catch (err) {
          console.error(err);
        }
      }
     
    });

    */
  } catch (err) {
    console.error(err);
  }
};

const sync_categories_from_QuickBooks_to_repzo = async (
  QuickBooks_products: Item.Find.Result[],
  repzo_client: Service.Client.Get.Result[]
) => {};

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

const get_all_repzo_categories = async (
  repzo: Repzo
): Promise<Service.Product.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_categories: any[];
    repzo_categories = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.category.find({
        page: 1,
        per_page,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_categories = [...repzo_categories, ...repzoObj.data];
    }
    return repzo_categories;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const get_all_QuickBooks_items = async (
  qb: QuickBooks,
  maxresults: number = 1
): Promise<Item.Find.Result> => {
  try {
    const qb_items = await qb.item.query({
      query: `select * from Item maxresults ${maxresults}`,
    });
    return qb_items;
  } catch (err) {
    throw err;
  }
};

const get_all_QuickBooks_categories = async (
  qb: QuickBooks
): Promise<Item.Find.Result> => {
  try {
    const qb_items = await qb.item.query({
      query: `select * from Item where Type='Category'`,
    });
    return qb_items;
  } catch (err) {
    throw err;
  }
};

const map_products = (item: Item.itemObject): Service.Product.Create.Body => {
  return {
    name: item.Name,
    category: "",
  };
};
