export interface QBCustomer {
  V4IDPseudonym: string;
  DisplayName: string;
  CompanyName?: string;
  PrimaryEmailAddr?: object;
  PrimaryPhone?: object;
  ResaleNum?: string;
  Active: boolean;
  Taxable?: boolean;
}

interface QBCustomers {
  Customer: QBCustomer[];
}
