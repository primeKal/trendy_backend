import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.provider';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders]
})
export class OrderModule {}
