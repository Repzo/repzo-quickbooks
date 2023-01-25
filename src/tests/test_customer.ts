// invoice;
import { Actions } from "../index.js";

const body = {
  __v: 0,
  _id: "63ce7fa3bea72dcbcbb4e538",
  assigned_media: [],
  assigned_product_groups: [],
  assigned_products: [],
  assigned_to: [],
  authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzJhNjA2MWQwYjkxMTVhZWIyY2RjOSIsImVtYWlsIjoibWFyYW0uYWxzaGVuQHJlcHpvYXBwLmNvbSIsIm5hbWUiOiJNYXJhbSBBbHNoZW4iLCJ0ZWFtIjpbXSwic2NvcGUiOiJhZG1pbiIsIm5hbWVTcGFjZSI6WyJxdWlja2Jvb2tzIl0sInBlcm1hU3RyaW5nIjoidnZ2dnZ2dnZ2djB2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYwdnZ2djAwdjB2dnZ2dnYwdjB2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYiLCJ0aW1lem9uZSI6IkFzaWEvQW1tYW4iLCJhcHBfY29kZSI6InJlcHpvX3BybyIsImNvdW50cnlfY29kZSI6WyJKTyJdLCJpc190ZXN0IjpmYWxzZSwiaWF0IjoxNjc0NDY5NDY4LCJleHAiOjE2NzQ1MTI2Njh9.c8lU1DFm4q-GAd-xAAO4mUMMg2sQXjV4ayDG3wj8YEI",
  availability_msl: [],
  chain: null,
  client_code: "quickbooks_555",
  comment: "",
  company_namespace: ["quickbooks"],
  contacts: [],
  cover_photo: null,
  createdAt: "2023-01-23T12:37:55.725Z",
  disabled: false,
  email: "",
  financials: {
    _id: "63ce7fa3bea72dcbcbb4e539",
    credit_limit: null,
  },
  formatted_address: "No location",
  geofencing_radius: null,
  isChain: false,
  job_category: [],
  jobs: [],
  lat: 0,
  lng: 0,
  location_verified: false,
  logo: null,
  media: [],
  name: "Repzo Client 1",
  parent_client_id: null,
  paymentTerm: null,
  payment_type: "credit",
  price_tag: null,
  profile_pic: null,
  rep_targets: [],
  shelf_share_targets: [],
  speciality: [],
  status: null,
  tags: [],
  target_visit: 0,
  teams: [],
  territory: null,
  updatedAt: "2023-01-23T12:37:55.725Z",
  website: "",
};
const action = "create_customer";
const action_sync_id = "db6c108d-119c-40bc-a79c-952d33ab2aa4";
Actions(
  {
    version: "2.0",
    routeKey: "POST /actions",
    rawPath: "/actions",
    rawQueryString: `app=repzo-qoyod&action=${action}`,
    headers: {
      action_sync_id,
      accept: "*/*",
      "accept-encoding": "gzip, deflate",
      "content-length": "3658",
      "content-type": "application/json",
      host: "staging.marketplace.api.repzo.me",
      "svix-id": "msg_29I1By29ETyPiZ4SNrc99KIg7D6",
      "svix-signature": "v1,OkktM+dibxzeb0M6383POFjBr7DX14HECpBIh17FQnU=",
      "svix-timestamp": "1652785653",
      "user-agent": "Svix-Webhooks/1.4",
      "x-amzn-trace-id": "Root=1-628381f6-0b2c6f346d2eb5d207b582ee",
      "x-forwarded-for": "52.215.16.239",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https",
    },
    queryStringParameters: {
      action,
      app: "repzo-quickbooks",
    },
    requestContext: {
      accountId: "478266140170",
      apiId: "ulkb1ikop2",
      domainName: "staging.marketplace.api.repzo.me",
      domainPrefix: "staging",
      http: {
        method: "POST",
        path: "/actions",
        protocol: "HTTP/1.1",
        sourceIp: "52.215.16.239",
        userAgent: "Svix-Webhooks/1.4",
      },
      requestId: "SRE-ejb6IAMEPWQ=",
      routeKey: "POST /actions",
      stage: "$default",
      time: "17/May/2022:11:07:34 +0000",
      timeEpoch: 1652785654069,
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Ae9vwBlTns5JDytPkyUEoA.okBGRP0h86j6BIE9AB_q4wuXVZC3Nj9n_S1nHzYQV_oIFvbbSA0sEF3CW7Zwugznw0T8LBhrxj4S5Mqoyv2DQMRNbZy2DW8m2g8GCW9KmLJ5aR-g3zPZFUyQ6Rfdy4TClj3uP4Y08TViITJ9OSRAv6LRd69YkCxyxyh-ZQTd3iu1ItqRufMgmK2TAZc2VoFS2wTUDfsvL_sQ6-xxaeKqtu3oCXycL8Msz0WNk1sDYTWAHWdmhEo4Pc15aO5fX2Ux8zIMDj0Tpc09PKdv8IaumH5uTHULYoaKD09Am_YE4oVuqafIsmhtN1vh8UaCd8RQUEnXx9yPW7F_FwXTr3Mh7lkaISB5hdNq6wz3036OZ0GLmo8INkMb0dw_bM2bvAUe8uXhgDrMgrZQDTdWxVkqHhcHrygyeqccs-YkkFqQkKDWlk3H1wQG4bJ9m4fUNa7RFJpGL3acFJxvuEDTVU4VoEqI-MVl_RYGyEhInUpqBQdb-GZHHC5RHttjzOWCs9f3ZbgaWwFMXbLXwPyyboiAyrno12OFgwgB2pWcqnLIDWWgDTgYQ8EzlaP44wRXYoz34kEEVCM3K_p-rUS2oRKGdXzsU7nZg8A_uPbEBWvbRkuMdrGpPKlH6mCAVPG99AWdQPif5ojH9YreCAp5u-8yZD29ascZGNXSTba42RonfA_RZJBw9qY71BE5P8Tve5_C2rFW-JrWTh6G_hcG8ex13LdQJqI2mYU2lnEHg8WV3RJXaQ5lcyjlGApJ0_aOnIPb.wP3ADecocI6FQqJFCyAFXA",
      realmId: "4620816365268574600",
    },
  },
  {
    env: "staging",
    // oauth2_data: {
    //   access_token:
    //     "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Ae9vwBlTns5JDytPkyUEoA.okBGRP0h86j6BIE9AB_q4wuXVZC3Nj9n_S1nHzYQV_oIFvbbSA0sEF3CW7Zwugznw0T8LBhrxj4S5Mqoyv2DQMRNbZy2DW8m2g8GCW9KmLJ5aR-g3zPZFUyQ6Rfdy4TClj3uP4Y08TViITJ9OSRAv6LRd69YkCxyxyh-ZQTd3iu1ItqRufMgmK2TAZc2VoFS2wTUDfsvL_sQ6-xxaeKqtu3oCXycL8Msz0WNk1sDYTWAHWdmhEo4Pc15aO5fX2Ux8zIMDj0Tpc09PKdv8IaumH5uTHULYoaKD09Am_YE4oVuqafIsmhtN1vh8UaCd8RQUEnXx9yPW7F_FwXTr3Mh7lkaISB5hdNq6wz3036OZ0GLmo8INkMb0dw_bM2bvAUe8uXhgDrMgrZQDTdWxVkqHhcHrygyeqccs-YkkFqQkKDWlk3H1wQG4bJ9m4fUNa7RFJpGL3acFJxvuEDTVU4VoEqI-MVl_RYGyEhInUpqBQdb-GZHHC5RHttjzOWCs9f3ZbgaWwFMXbLXwPyyboiAyrno12OFgwgB2pWcqnLIDWWgDTgYQ8EzlaP44wRXYoz34kEEVCM3K_p-rUS2oRKGdXzsU7nZg8A_uPbEBWvbRkuMdrGpPKlH6mCAVPG99AWdQPif5ojH9YreCAp5u-8yZD29ascZGNXSTba42RonfA_RZJBw9qY71BE5P8Tve5_C2rFW-JrWTh6G_hcG8ex13LdQJqI2mYU2lnEHg8WV3RJXaQ5lcyjlGApJ0_aOnIPb.wP3ADecocI6FQqJFCyAFXA",
    //   realmId: "4620816365268574600",
    // },
    data: {
      Customers: {
        createClientHook: true,
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: true,
      },
      Invoices: {
        createInvoiceHook: true,
      },
      Payments: {
        createPaymentHook: true,
      },
      repzoApiKey: "X1PuNnjqyZebWXeIC7q5k866rD3uSOyBPwurqfASB9M",
    },
  }
);
