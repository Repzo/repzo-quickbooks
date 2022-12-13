# Release Notes

## [v1.0.0 (2022-09-10)](https://github.com/Repzo/repzo-quickbooks.git)

### Added
### Changed
[commands/customer]
- add uniq id to integration_meta to the map_customers function include : company_namespace + customer.Id @fouadhijazi

- change checking qb_customers condition to create or update
  => make it depends on integration_meta.id @fouadhijazi
### Fixed
### Removed

---

### Added
### Changed
[commands/items]
- add uniq id to integration_meta to the map_items function include > id: company_namespace + "\*" + item.Id, @fouadhijazi

- add integration\*meta to variants in map*items function include > integration_meta: {
  id: company_namespace + * + item.Id,
  quickBooks_id: item.Id,
  QuickBooks_last_sync: new Date().toISOString(),
  }, @fouadhijazi

  - change checking qb_item condition to create or update
    => make it depends on integration_meta.id @fouadhijazi
    
### Fixed

[commands/items]

- fixed the SQL query in get_all_QuickBooks_items moving Type after get all the items function to get the all items @fouadhijazi

### Removed

---

### Added
### Changed
[commands/tax]

- add uniq id to integration_meta to the map_items function include > id: company_namespace + \* + item.Id, @fouadhijazi

  - change checking qb_tax condition to create or update
    => make it depends on integration_meta.id @fouadhijazi

### Fixed
### Removed

---

### Added
[actions/create_return_invoice]
- return data saved in QB in end separate endpoint /creditmemo
take us to add new action to push it on return item on line[] 
### Changed
### Fixed
### Removed

-------------------------------------------------

-- Notes --

### Commands Notes

--[commands/customer] :
[create]

- No Problems
  [update]
- No Problems
  [active-Inactive]
- didn't handel the active and inactive
  => QB didn't bring the active and inactive

--[commands/product] :
[create]

- didn't sync the full data ,date missed : [QTY, Warehouse ,Pic ,SKU ,Category]
  => QB didn't bring this data to save it
  [update]
- No Problems
  [active-Inactive]
- didn't handel the active and inactive
  => QB didn't bring the active and inactive

### Action Notes

[actions/invoice]
- No Problems

[actions/client]
- No Problems

[actions/payment]
- payment didn't have an uniq filed
