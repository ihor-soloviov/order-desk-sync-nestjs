interface Shipping {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  country: string;
  state: string;
  city: string;
}

export interface Data {
  orders: Array<Order>;
}

export interface Order {
  shipping: Shipping;
  id: number;
  date_added: string;
}

export interface Time {
  date: Date;
}
