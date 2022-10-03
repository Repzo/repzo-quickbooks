import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Invoice } from "../quickbooks/types/invoice";
import QuickBooks from "../quickbooks/index.js";

var result: Result = {
  QuickBooks_total: 0,
  repzo_total: 0,
  created: 0,
  updated: 0,
  failed: 0,
};

export const create_invoice = async (
  commandEvent: CommandEvent
): Promise<Result> => {
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

    // sync_invoices_from_QuickBooks_to_repzo
    let res = await sync_invoices_from_QuickBooks_to_repzo(
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

const sync_invoices_from_QuickBooks_to_repzo = async (
  repzo: Repzo,
  qb: QuickBooks,
  bench_time_client: string
): Promise<Result> => {
  try {
    // const qb_invoices = await get_all_QuickBooks_invoices(
    //   qb,
    //   "Inventory",
    //   1000
    // );

    let repzo_invoices = await get_all_repzo_invoices(repzo);

    console.log(repzo_invoices);

    // result.QuickBooks_total = qb_invoices.QueryResponse.Item.length;
    // result.repzo_total = repzo_invoices.length;
    // repzo_invoices = repzo_invoices.filter(
    //   (i) => i.integration_meta?.QuickBooks_id !== undefined
    // );
    /*
    qb_invoices.QueryResponse.Item.forEach(async (item) => {
      let existProduct = repzo_invoices.filter(
        (i) => i.integration_meta?.QuickBooks_id === item.Id
      );
      if (existProduct[0]) {
        if (
          new Date(existProduct[0]?.integration_meta?.QuickBooks_last_sync) <
          new Date()
          // new Date(item.MetaData?.LastUpdatedTime)
        ) {
          try {
            console.log(
              `update repzo product id -- ${existProduct[0]._id} ...`
            );
            // let repzo_product = map_invoices(item, repzo_default_category._id);
            // await repzo.product.update(existProduct[0]._id, repzo_product);
            result["updated"] = result["updated"] + 1 || 1;
          } catch (err) {
            console.error(err);
            result["failed"] = result["failed"] + 1 || 1;
          }
        }
      } else {
        //create a new  repzo client
        try {
          // console.log(`create a new repzo product name -- ${item.Name} ...`);

          // await repzo.product.create(repzo_product);
          result["created"] = result["created"] + 1 || 1;
        } catch (err) {
          console.error(err);
          result["failed"] = result["failed"] + 1 || 1;
        }
      }
    });
    */
  } catch (err) {
    console.error(err);
  }
  return result;
};

const get_all_repzo_invoices = async (
  repzo: Repzo
): Promise<Service.FullInvoice.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_invoices: any[];
    repzo_invoices = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.invoice.find({
        page: 1,
        per_page,
        disabled: false,
        is_void: false,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_invoices = [...repzo_invoices, ...repzoObj.data];
    }
    return repzo_invoices;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const get_all_QuickBooks_invoices = async (
  qb: QuickBooks,
  type: string,
  maxresults: number = 1
): Promise<Invoice.Find.Result> => {
  try {
    const qb_invoices = await qb.invoice.query({
      query: `select * from Invoice where Type='${type}' maxresults ${maxresults}`,
    });
    return qb_invoices;
  } catch (err) {
    throw err;
  }
};

/*
const map_invoices = (
  item: Invoice.InvoiceObject,
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
*/
