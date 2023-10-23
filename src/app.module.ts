import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, ProductModule, RoleModule, ProductCategoryModule, OrderModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
