import Repzo from "repzo";
import QuickBooks from "../quickbooks/index.js";
import { v4 as uuid } from "uuid";
import { set_error, update_bench_time } from "../util.js";
const bench_time_key = "bench_time_products";
/**
 * Event To Sync Quickbooks Items - Repzo products
 * @param commandEvent
 * @returns
 */
export const items = async (commandEvent) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
  // const new_bench_time = new Date().toISOString();
  const command_sync_id = commandEvent.sync_id || uuid();
  const { app } = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(
    (_a = app.formData) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  const company_namespace = commandEvent.nameSpace.join("_");
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken:
      ((_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token) || "",
    realmId:
      ((_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId) || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  // init result object
  let result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const failed_docs_report = [];
  let sync = [];
  try {
    const new_bench_time = new Date().toISOString();
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("⌛ Syncing Products ......").commit();
    // await commandLog
    //   .addDetail(
    //     `Syncing Products since ${
    //       commandEvent.app?.options_formData?.[bench_time_key] || "ever"
    //     }`,
    //   )
    //   .commit();
    // if (!app.options_formData[bench_time_key]) {
    //   await commandLog.addDetail("❌  bench_time_products undefined").commit();
    // }
    // return all repzo items
    let qb_items = await get_all_QuickBooks_items(qbo, app);
    // return all quickbooks products
    let repzo_products = await get_all_repzo_products(repzo);
    result.quickBooks_total =
      (_e =
        (_d = qb_items.QueryResponse) === null || _d === void 0
          ? void 0
          : _d.Item) === null || _e === void 0
        ? void 0
        : _e.length;
    result.repzo_total =
      repzo_products === null || repzo_products === void 0
        ? void 0
        : repzo_products.length;
    repzo_products = repzo_products.filter((i) => {
      var _a;
      return (
        ((_a = i.integration_meta) === null || _a === void 0
          ? void 0
          : _a.id) !== undefined
      );
    });
    const repzo_taxes = await repzo.tax.find({ per_page: 5000 });
    for (
      let i = 0;
      i <
      ((_g =
        (_f = qb_items.QueryResponse) === null || _f === void 0
          ? void 0
          : _f.Item) === null || _g === void 0
        ? void 0
        : _g.length);
      i++
    ) {
      const item = qb_items.QueryResponse.Item[i];
      const repzo_default_category = await get_repzo_default_category(
        repzo,
        (_h = item.ParentRef) === null || _h === void 0 ? void 0 : _h.name
      );
      let repzo_tax;
      if (
        (_j = item.SalesTaxCodeRef) === null || _j === void 0
          ? void 0
          : _j.value
      ) {
        const tax_type = item.SalesTaxIncluded ? "inclusive" : "additive";
        repzo_tax =
          repzo_taxes === null || repzo_taxes === void 0
            ? void 0
            : repzo_taxes.data.find((tax) => {
                var _a, _b;
                return (
                  ((_a = tax.integration_meta) === null || _a === void 0
                    ? void 0
                    : _a.id) ==
                  `${company_namespace}_${
                    (_b = item.SalesTaxCodeRef) === null || _b === void 0
                      ? void 0
                      : _b.value
                  }_${tax_type}`
                );
              });
        if (!repzo_tax) {
          result.failed++;
          failed_docs_report.push({
            method: "update",
            doc_id: item.Id,
            doc: item,
            error_message: set_error(
              `Tax with QB Id: ${
                (_k = item.SalesTaxCodeRef) === null || _k === void 0
                  ? void 0
                  : _k.value
              } was not found on Repzo`
            ),
          });
          continue;
        }
      }
      let existProduct = repzo_products.find((i) => {
        var _a;
        return (
          ((_a = i.integration_meta) === null || _a === void 0
            ? void 0
            : _a.id) === `${company_namespace}_${item.Id}`
        );
      });
      if (existProduct) {
        if (
          new Date(
            (_l =
              existProduct === null || existProduct === void 0
                ? void 0
                : existProduct.integration_meta) === null || _l === void 0
              ? void 0
              : _l.QuickBooks_last_sync
          ) <
          new Date(
            (_m = item.MetaData) === null || _m === void 0
              ? void 0
              : _m.LastUpdatedTime
          )
        ) {
          let repzo_product = map_products(
            item,
            repzo_default_category._id,
            repzo_tax === null || repzo_tax === void 0 ? void 0 : repzo_tax._id,
            company_namespace
          );
          (_o = repzo_product.variants) === null || _o === void 0
            ? void 0
            : _o.forEach((variant) => {
                var _a;
                // variant._id =
                const matched_variant =
                  (_a =
                    existProduct === null || existProduct === void 0
                      ? void 0
                      : existProduct.variants) === null || _a === void 0
                    ? void 0
                    : _a.find((repzo_variant) => {
                        var _a, _b;
                        return (
                          ((_a = repzo_variant.integration_meta) === null ||
                          _a === void 0
                            ? void 0
                            : _a.id) ==
                          ((_b =
                            variant === null || variant === void 0
                              ? void 0
                              : variant.integration_meta) === null ||
                          _b === void 0
                            ? void 0
                            : _b.id)
                        );
                      });
                if (matched_variant) {
                  variant._id = matched_variant._id;
                }
              });
          try {
            sync.push(repzo_product.name);
            await repzo.product.update(existProduct._id, repzo_product);
            result.updated++;
          } catch (e) {
            result.failed++;
            failed_docs_report.push({
              method: "update",
              doc_id: existProduct._id,
              doc: repzo_product,
              error_message: set_error(e),
            });
          }
        }
      } else {
        //create a new  repzo product
        let repzo_product = map_products(
          item,
          repzo_default_category._id,
          repzo_tax === null || repzo_tax === void 0 ? void 0 : repzo_tax._id,
          company_namespace
        );
        try {
          sync.push(repzo_product.name);
          await repzo.product.create(repzo_product);
          result.created++;
        } catch (e) {
          result.failed++;
          failed_docs_report.push({
            method: "create",
            doc: repzo_product,
            error_message: set_error(e),
          });
        }
      }
    }
    await update_bench_time(
      repzo,
      commandEvent.app._id,
      bench_time_key,
      new_bench_time
    );
    await commandLog
      .addDetail(`✅  Complete Sync Products`, sync)
      .setStatus(
        "success",
        failed_docs_report.length ? failed_docs_report : null
      )
      .setBody(result)
      .commit();
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();
  } finally {
    return result;
  }
};
/**
 * Get all repzo products
 * @param repzo
 * @returns
 */
const get_all_repzo_products = async (repzo) => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_products;
    repzo_products = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.product.find({
        page: 1,
        per_page,
        // disabled: false,
        withVariants: true,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_products = [...repzo_products, ...repzoObj.data];
    }
    return repzo_products;
  } catch (err) {
    throw err;
  }
};
/**
 * Get repzo category
 * @param repzo
 * @param name
 * @returns
 */
const get_repzo_default_category = async (repzo, name) => {
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
          name: name,
          local_name: "Created by Quickbooks",
        });
      }
    } else {
      let repzoObj = await repzo.category.find({
        name: "Default",
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
    throw err;
  }
};
/**
 * Get All Quickbooks Items
 * @param qb
 * @param app
 * @returns
 */
const get_all_QuickBooks_items = async (qb, app) => {
  const { Products } = app.formData;
  let bench_time_products = app.options_formData[bench_time_key];
  try {
    let query = `select * from Item`;
    if (Products.pullInventoryItems || Products.pullServiceItems) {
      query += ` where Type In`;
      query += `(`;
      query += `'NonInventory'`;
      if (Products.pullInventoryItems) {
        query += `,'Inventory'`;
      }
      if (Products.pullServiceItems) {
        query += `,'Service'`;
      }
      query += `)`;
    }
    if (
      (Products.pullInventoryItems || Products.pullServiceItems) &&
      bench_time_products
    ) {
      query += ` AND `;
    }
    if (bench_time_products) {
      // bench_time_products = bench_time_products.slice(0, 10);
      query += `MetaData.LastUpdatedTime >= '${bench_time_products}'`;
    }
    query += ` maxresults 1000`;
    const qb_items = await qb.item.query({ query });
    return qb_items;
  } catch (err) {
    throw err;
  }
};
/**
 * Map Items and Products
 * @param item
 * @param categoryID
 * @returns
 */
const map_products = (item, categoryID, taxId, company_namespace) => {
  return {
    name: item.Name,
    description: item.Description,
    active: item.Active,
    sku: item.Sku,
    local_name: item.FullyQualifiedName,
    base_price: item.UnitPrice ? String(Math.round(item.UnitPrice * 1000)) : "",
    category: categoryID,
    sv_tax: taxId,
    variants: [
      {
        default: true,
        disabled: false,
        sku: item.Sku,
        name: item.Name,
        price: item.UnitPrice ? Math.round(item.UnitPrice * 1000) : 0,
        integration_meta: {
          id: company_namespace + "_" + item.Id,
          quickBooks_id: item.Id,
          QuickBooks_last_sync: new Date().toISOString(),
        },
      },
    ],
    integration_meta: {
      id: company_namespace + "_" + item.Id,
      quickBooks_id: item.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
