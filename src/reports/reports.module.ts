import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { orderLineProviders } from 'src/order/order.line.providers';
import { orderProviders } from 'src/order/order.provider';
import { productCategoryProviders } from 'src/product-category/profuct.category.provider';
import { productProviders } from 'src/product/product.provider';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ...orderLineProviders,...orderProviders, ...productCategoryProviders,
              ...productProviders]
})
export class ReportsModule {}
