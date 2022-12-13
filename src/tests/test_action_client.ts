// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "63871afdba66bcd7ca03709e",
  tags: [],
  client_code: "_000001",
  contacts: [],
  disabled: false,
  formatted_address: "No location",
  lat: 0,
  lng: 0,
  location_verified: false,
  name: "Ammar Abu Shanab - Updated",
  assigned_to: [],
  rep_targets: [],
  shelf_share_targets: [],
  profile_pic: null,
  logo: null,
  website: "",
  email: "",
  comment: "",
  parent_client_id: null,
  target_visit: 0,
  geofencing_radius: null,
  price_tag: null,
  jobs: [],
  status: null,
  job_category: [],
  availability_msl: [],
  territory: null,
  assigned_media: [],
  assigned_products: [],
  assigned_product_groups: [],
  financials: {
    credit_limit: null,
    _id: "63871afdba66bcd7ca03709f"
  },
  paymentTerm: null,
  speciality: [],
  company_namespace: ["fouad"],
  isChain: false,
  chain: null,
  teams: [],
  payment_type: "credit",
  media: [],
  cover_photo: null,
  createdAt: "2022-11-30T08:57:33.351Z",
  updatedAt: "2022-11-30T09:21:46.377Z",
  __v: 0
};
const action = "create_customer";
const action_sync_id = "d6d05d1e-44b5-458b-9f04-b76e2b5ca30f";
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
      "x-forwarded-proto": "https"
    },
    queryStringParameters: {
      action,
      app: "repzo-quickbooks"
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
        userAgent: "Svix-Webhooks/1.4"
      },
      requestId: "SRE-ejb6IAMEPWQ=",
      routeKey: "POST /actions",
      stage: "$default",
      time: "17/May/2022:11:07:34 +0000",
      timeEpoch: 1652785654069
    },
    body: JSON.stringify(body),
    isBase64Encoded: false
  },
  {
    env: "staging",
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ynEp_ckFTv0z052Tg_Z-WQ.v8gsFNhce75ujCKP1MnZ89Th1ZkBcmGTlsIqI_SDuYiA8r5a2aHabYvAFyYmev1esyq6DPUlaZapSS4uF0jSO53LoTwUAPKSbYbKlZUwRPr1oMcMOisgvE4JM1pMbmhIJEoGwbh6YD2emD4UexebWjObGSXeaUMJFiXRTpVv-Vwj8bY520_SGOEjVazVd0o7TN8Bp7fBbp2GeOfausN--CWayXsKvczIAONdt-W0pthgr86qV35OTZTOxsb7V3p_08o1Xw7mX7QNvm5JXWm687MP0Ebnt8oj5tJTg_VwZvJRzkl9QJ6C2rLWf2Wq7q0S38kU8NVBcziNKcDMTfT7R9z7VOSPMEBmwTcqB2tjzqgfO0Q1ibkNzWNx96rE7ZQtITFe-ouz7dQXSdI1SO4OaO_jJx0r-wqsL9UlNCInLB7S8affA5o_YpfaA1bjFQzD-Nfp1QtH9sT7gqrBAI76QE6xyZ5J-07jLA1Ctijv3AkCBh1-0FoIZdR_R5k9SEguT61dZvnwKVJF3UWtpVPTkPQAOYKa0pevfOW-YY1EDKlRMj8K_osNbH8OQ8sSbZD5GKnCE68mOqDxQPCCzemJ7ZUdAg52ceNKpRr_JLN9Gx7slDhfc25qo5xBh2mJws6ZLg72eqi8RH-rrHtIapWuH5MY4tYM9Hh5bvpAmDYG8V-l-8TYVSr3kPjbc72XeUXRCu6-NN4MYw284yk4HXze-5vBswXsk_oBOHQrpNdc3U5eJvo29zw2MqVkI_rYGWK4.e5vAOaVlW6qA6ZbukTv7jg",
      realmId: "4620816365258829620"
    },
    data: {
      Customers: {
        createClientHook: true
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: false,
        createProductHook: false
      },
      Invoices: {
        createInvoiceHook: false
      },
      repzoApiKey: "bNkxScPFP2UIZL-t-30TpNZnIukWfyGtvF9bB_64hIs",
      errorEmail: "ahmed.khaled@repzoapp.com"
    }
  }
);
