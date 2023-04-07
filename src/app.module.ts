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
    const date = new Date(Date.now() - 7 * 60 * 60 * 1000);
    const response = await this.orderDeskService.fetchNewOrders();
    const orders = response.data.orders;

    this.orderDeskService.logOrders(orders);
    setInterval(
      () => this.orderDeskService.logNewOrders(orders, date),
      //для тесту поставив таймінг у 2 хвилини, щоб встигнути зробити нове замовлення. по завдання цей скрипт спрацьовує раз на годину
      120 * 1000,
    );
  }
}
