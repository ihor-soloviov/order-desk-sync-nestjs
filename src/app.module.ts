import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderDeskService } from './orderdesk.service';
import { Address } from './address/address.provider';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [OrderDeskService, Address],
})
export class AppModule {
  constructor(private readonly orderDeskService: OrderDeskService) {}

  async onApplicationBootstrap(): Promise<void> {
    setInterval(() => this.orderDeskService.fetchNewOrders(), 60 * 60 * 1000);
  }
}
