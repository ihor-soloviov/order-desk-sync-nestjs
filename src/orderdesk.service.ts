import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Address } from './address/address.provider';

@Injectable()
export class OrderDeskService {
  private readonly logger = new Logger(OrderDeskService.name);
  constructor(private addressService: Address) {}

  apiKey = 'UtFSGa4gkqoCgkyXowthHhCLq9mioQNQLBu7nvgzAskcG7Eoot';
  storeId = 52114;

  async fetchNewOrders(): Promise<void> {
    try {
      const headers = {
        'ORDERDESK-STORE-ID': this.storeId,
        'ORDERDESK-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://app.orderdesk.me/api/v2/orders/new',
        {
          headers,
        },
      );
      this.addressService.allAddressesLine(response);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
