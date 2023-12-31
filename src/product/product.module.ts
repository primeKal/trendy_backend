import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';

@Module({
  providers: [ProductService, ...productProviders],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
