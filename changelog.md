# Release Notes

## [v1.0.0 (2022-09-10)](https://github.com/Repzo/repzo-quickbooks.git)

### Added

### Changed

[commands/create_customer] add uniq id to integration_meta to the map_customers function include : company_namespace + customer.Id @fouadhijazi

### Fixed

### Removed

---

### Added

### Changed

[commands/create_items] add uniq id to integration_meta to the map_customers function include : company_namespace + item.Id @fouadhijazi

### Fixed

[commands/create_items] fixed the SQL query in get_all_QuickBooks_items function to get the all items @fouadhijazi

### Removed

---

### Commands Notes

--[commands/customer] :
[create]

- if theres no oAth2 and want to sync the clients didn't paper any problem and return { quickBooks_total: 0,repzo_total: 0,created: 0,updated: 0,failed:0} ,
  [update]
- didn't handel the active and inactive

--[commands/product] :
[create]

- didn't sync the full data ,date missed : [QTY, Warehouse ,Pic ,SKU ,Category]
  [update]
- didn't update must to delete the item in Repzo
- didn't handel the active and inactive

### Action Notes

[actions/invoice]

- didn't create an invoice in QB for client we created in Repzo
- didn't handel the return items in invoice ,throw it and take only the added items

[actions/payment]

- payment didn't have an uniq filed
