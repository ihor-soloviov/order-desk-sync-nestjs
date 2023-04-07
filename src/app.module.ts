import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { OrderDeskService } from './orderdesk.service';
import { Address } from './address/address.provider';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  providers: [OrderDeskService, Address],
})
export class AppModule {
  constructor(private readonly orderDeskService: OrderDeskService) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      const time = {
        date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      };
      const orders = await this.orderDeskService.fetchNewOrders();
      // await this.orderDeskService.fetchNewOrders();

      this.orderDeskService.logOrders(orders);
      setInterval(() => this.orderDeskService.logNewOrders(time), 1000);
    } catch (error) {
      console.error(error);
    }
  }
}
