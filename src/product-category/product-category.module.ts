import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductModule } from 'src/product/product.module';
import { ProductCategoryController } from './product-category.controller';
import { productCategoryProviders } from './profuct.category.provider';

@Module({
  providers: [ProductCategoryService, ...productCategoryProviders],
  imports: [ProductModule],
  controllers: [ProductCategoryController]
})
export class ProductCategoryModule {}
