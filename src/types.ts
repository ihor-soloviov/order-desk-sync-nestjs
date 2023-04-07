interface Shipping {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  country: string;
  state: string;
  city: string;
}

export interface Order {
  shipping: Shipping;
  id: number;
  date_updated: string;
}
