import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Address } from './message/message.provider';
import { Order, Time, Data } from './types';
import { format } from 'date-fns';

@Injectable()
export class OrderDeskService {
  private readonly logger = new Logger(OrderDeskService.name);
  constructor(private addressService: Address) {}

  async fetchNewOrders(): Promise<Array<Order>> {
    try {
      const headers = {
        'ORDERDESK-STORE-ID': process.env.STORE_ID,
        'ORDERDESK-API-KEY': process.env.API_KEY,
        'Content-Type': 'application/json',
      };

      const { data } = await axios.get<Data>(
        'https://app.orderdesk.me/api/v2/orders?order=desc',
        {
          headers,
        },
      );

      return data.orders;
    } catch (error) {
      this.logger.error(error);
    }
  }

  logOrders(orders: Array<Order>) {
    for (const order of orders) {
      this.addressService.logShippingMessage(order);
    }
  }

  async logNewOrders(time: Time) {
    try {
      const newOrders = await this.fetchNewOrders();
      const lastUpdatingTime = format(time.date, 'yyyy-MM-dd HH:mm:ss');

      for (const order of newOrders) {
        if (order.date_added > lastUpdatingTime) {
          this.addressService.logShippingMessage(order);
          time.date = new Date(Date.now() - 3 * 60 * 60 * 1000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
