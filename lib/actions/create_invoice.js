import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_invoice = async (event, options) => {
  var _a, _b, _c;
  const repzo = new Repzo(
    (_a = options.data) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    { env: options.env }
  );
  const action_sync_id =
    ((_b = event === null || event === void 0 ? void 0 : event.headers) ===
      null || _b === void 0
      ? void 0
      : _b.action_sync_id) || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body;
  let invoice = {
    CurrencyRef: { name: "", value: "" },
    CustomerRef: { name: "", value: "" },
    Line: [],
  };
  try {
    // console.log("create_invoice");
    // await actionLog.load(action_sync_id);
    body = event.body;
    const qbo = new QuickBooks({
      oauthToken: options.oauth2_data.access_token,
      realmId: options.oauth2_data.realmId,
      sandbox: options.env === "production" ? false : true,
    });
    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}
    // await actionLog
    //   .addDetail(
    //     `Repzo QuickBooks: Started Create Invoice - ${body?.serial_number?.formatted}`
    //   )
    //   .commit();
    const repzo_invoice = body;
    // console.log(repzo_invoice);
    const repzo_client = await repzo.client.get(repzo_invoice.client_id);
    invoice.CustomerRef.value =
      (_c = repzo_client.integration_meta) === null || _c === void 0
        ? void 0
        : _c.QuickBooks_id;
    invoice.Line.push({
      Id: "1",
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        TaxInclusiveAmt: 1,
        DiscountAmt: 1,
        // ItemRef: ReferenceType;
        // ClassRef: ReferenceType;
        // ItemAccountRef?: ReferenceType;
        // TaxCodeRef: ReferenceType;
        // TaxClassificationRef?: ReferenceType;
        // MarkupInfo: MarkupInfo;
        // ServiceDate: Date;
        DiscountRate: 1,
        Qty: 1,
        UnitPrice: 100,
      },
      Amount: 100,
      LineNum: 1,
      Description: "simple invoice from repzo",
    });
    await qbo.invoice.create(invoice);
    //@ts-ignore
    // repzo_invoice.items.foreach((i) => {
    //   console.dir(i, { depth: 0 });
    //   // invoice.Line.push({});
    // });
    console.log(repzo_client);
    /*
        if (!qoyod_client.integration_meta?.qoyod_id)
          throw new Error(
            `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} was missed the integration.qoyod_id`
          );
    
        const repzo_invoice_warehouse = await repzo.warehouse.get(
          repzo_invoice.origin_warehouse
        );
        if (!repzo_invoice_warehouse.integration_meta?.qoyod_id)
          throw new Error(
            `Sync Invoice Failed >> invoice.origin_warehouse: ${repzo_invoice.origin_warehouse} - ${repzo_invoice_warehouse?.name} was missed the integration.qoyod_id`
          );
    
        const repzo_invoice_variant_ids: any = {};
        const repzo_invoice_measureunit_ids: any = {};
    
        repzo_invoice.items.forEach((item: Service.Item.Schema) => {
          repzo_invoice_variant_ids[item.variant.variant_id] = true;
          repzo_invoice_measureunit_ids[item.measureunit._id] = true;
        });
    
        const repzo_variants = await repzo.variant.find({
          _id: Object.keys(repzo_invoice_variant_ids),
          per_page: 50000,
        });
    
        const repzo_measureunits = await repzo.measureunit.find({
          _id: Object.keys(repzo_invoice_measureunit_ids),
          per_page: 50000,
        });
    */
    // console.dir(qoyod_invoice_body, { depth: null });
    // actionLog.setMeta(qoyod_invoice_body);
    // await actionLog
    //   .addDetail(
    //     `Repzo Qoyod: Invoice - ${qoyod_invoice_body?.invoice?.reference}`,
    //     qoyod_invoice_body
    //   )
    //   .commit();
    // const result = await _create(
    //   options.serviceEndPoint,
    //   "/invoices",
    //   qoyod_invoice_body,
    //   { "API-KEY": options.data.serviceApiKey }
    // );
    // console.log(result);
    // await actionLog
    //   .addDetail(`Qoyod Responded with `, result)
    //   .addDetail(
    //     `Repzo Qoyod: Invoice - ${qoyod_invoice_body?.invoice?.reference}`
    //   )
    //   .setStatus("success")
    //   .setBody(body)
    //   .commit();
    // return result;
  } catch (e) {
    //@ts-ignore
    console.dir(e, { depth: null });
    // await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};
