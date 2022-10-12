// invoice;
import { Actions } from "../index.js";
import body from "../tests/models/actions/Create-Invoice.json";
const action = "create_customer";
Actions(
  {
    version: "2.0",
    routeKey: "POST /actions",
    rawPath: "/actions",
    rawQueryString: `app=repzo-qoyod&action=${action}`,
    headers: {
      // action_sync_id: "c7d6a09f-d472-4527-afa2-57fbe198d133",
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
  },
  {
    env: "staging",
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..71TLzScBGTyqHjmVRxLFog.7-P05GxXFsTq2CVJxK1dsItUhfJ1thW9kgN5yGlmzj2tp9KNHx7xyak-GQSN9tgKLA_Ov1Ahsp3NnFsRPVNTF7Gudr0zlWZMRF3QTF1f85t4WyQlc2OkQtkV-k_MV76dzaeXuqW5pLWlkHykLp3-uwxcMrwDPobldpn3kw_cCj_-Gc1Snc0vcHAAAKEXptX0o5eYGHX9f9m_d4uMpQCzrZnT50sTgPmYdWG1RA5TWMSzYmcaWkZ2oj_DiKtHLG8wm4D9TctMEWYt2YbiQZnh4h1MCHhqtralNflLiR8ntib0V9u1R4QFKs5JZ6oa8hnBqJ7c5m05qIjCuaaXzqf4EDEPafpCnS-FTKF7HfRRSmP8nU0KpZlelh1lLaqUntfk7GSx9JW8-MeIPy4_ql8b4kgx4o0xu5CWZOgzknQMNk1roe16xs6GG0bwBFyX2OcKjShPMbSCIehFdxMOGvPBylAIZaah5FqgeXf-G3efQHOuzOZXWlPs-N2i0ZhYrXEghTss8_IfIK-Prd4E3Usq0dvQPc2nYW8ddJ3FCLxfxxNQDN_I1AXLetaR-IpC0V80LgyE_kSxq5kun0FhsWD45SjSb1CCAhwMiNX1JMIVIkpsK2ho7ZNFAELKxWfBG51p-92fiMMAqmS2OaPAPKXJLPpFtQo1zUlzkE02asBaRHqwU5Ii5I5kqlfGOe8dX2f0L40aRvy_LdM5BM3fGJPm_LxDJ2eZEEyZuaGIjGnY1TvYXGxcCqMaqXWxPnqqXghK.XTjK2h52mj67JFCB5UeH_Q",
      realmId: "4620816365241355500",
    },
    data: {
      Customers: {
        createClientHook: true,
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: false,
        createProductHook: false,
      },
      Invoices: {
        createInvoiceHook: false,
      },
      repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
  }
);
