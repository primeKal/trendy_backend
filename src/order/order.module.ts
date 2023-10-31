import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.provider';
import { orderLineProviders } from './order.line.providers';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders, ...orderLineProviders]
})
export class OrderModule {}
