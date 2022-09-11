var QuickBooks = require("node-quickbooks");

var qbo = new QuickBooks(
  "",
  "",
  oauthToken,
  true, // no token secret for oAuth 2.0
  realmId,
  true, // use the sandbox?
  true, // enable debugging?
  null, // set minorversion, or null for the latest version
  "2.0", //oAuth version
  ""
);

/* qbo.findCustomers(
    {
      fetchAll: true,
    },
    function (e, customers) {
      if (e) console.log(e);
      console.log(customers);
    }
  ); */
