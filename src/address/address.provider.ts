import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Order } from '../types';

@Injectable()
export class Address {
  allAddressesLine(response: AxiosResponse): void {
    return response.data.orders.forEach((order: Order) => {
      const { shipping, id } = order;
      const { address1, address2, address3, address4, country, state, city } =
        shipping;
      const address = address1 || address2 || address3 || address4;
      const addressParams = [];
      addressParams.push(country, state, city, address);
      const fullShippingAddress = addressParams.filter(Boolean).join(', ');
      console.log(
        `New order: ID ${id}, shipping address: ${
          fullShippingAddress || 'unknown address'
        }`,
      );
    });
  }
}
