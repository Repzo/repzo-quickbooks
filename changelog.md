# Release Notes

## [v1.0.0 (2022-09-10)](https://github.com/Repzo/repzo-quickbooks.git)

### Added

- [command/item] fix sku & category AND inject tax depend on the QB @maramalshen
- [command/customer] add formatted_address @maramalshen
- [command/tax] handle taxCode & taxRate AND add for each tax 2 types additive & inclusive @maramalshen
- [action/invoice] handle TaxCodeRef in the invoice & return_invoice @maramalshen
- [command/basic] fix bug: sync taxes before sync products @maramalshen
- [command/inventory-adjustment] add new Command: adjust inventory from Repzo to QuickBooks @maramalshen
- [command/inactive_items] add new Command: sync inactive items from QuickBooks to QuickBooks @maramalshen

### Changed

### Fixed

- [commands/customers] fix bug, get customers paginated from qp @maramalshen
- [command/items] fix bug in update disabled products @maramalshen

### Removed
