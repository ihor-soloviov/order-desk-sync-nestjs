import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Address } from './address/address.provider';
import { Order } from './types';
import * as moment from 'moment';

@Injectable()
export class OrderDeskService {
  private readonly logger = new Logger(OrderDeskService.name);
  constructor(private addressService: Address) {}

  apiKey = 'UtFSGa4gkqoCgkyXowthHhCLq9mioQNQLBu7nvgzAskcG7Eoot';
  storeId = 52114;

  async fetchNewOrders(): Promise<AxiosResponse> {
    try {
      const headers = {
        'ORDERDESK-STORE-ID': this.storeId,
        'ORDERDESK-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://app.orderdesk.me/api/v2/orders?order=desc',
        {
          headers,
        },
      );

      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }

  logOrders(orders: Array<Order>) {
    for (const order of orders) {
      this.addressService.allAddressesLine(order);
    }
  }

  async logNewOrders(orders: Array<Order>, date: Date) {
    const newOrders = (await this.fetchNewOrders()).data.orders;
    const lastUpdatingTime = moment(date).format('YYYY-MM-DD HH:mm:ss');

    for (const order of newOrders) {
      if (order.date_added > lastUpdatingTime) {
        this.addressService.allAddressesLine(order);
      }
    }
  }
}
