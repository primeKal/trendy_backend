import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDto } from './dto/product.category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from './product.category.entity';

@Controller('product-category')
export class ProductCategoryController {
    constructor(private productCategoryService: ProductCategoryService){

    }
    @Get()
    public async getProductCategories(): Promise<ProductCategory[]> {
      return this.productCategoryService.getAllProductCategories();
    }

    @Get()
    @ApiProperty()
    public async getAProductCategory(@Param('id') id: number): Promise<ProductCategory>{
      return this.productCategoryService.getOneProductCategoryById(id);
    }

    @Post()
    public async createProductCategory(@Body() body: ProductCategoryDto): Promise<ProductCategory> {
      return this.productCategoryService.createProductCategory(body);
    }

    @Put()
    public async editUser(@Body() body: ProductCategoryDto): Promise<ProductCategory> {

      return this.productCategoryService.editProductCategory(body);
    }

    @Delete()
    public async deleteUser(@Body() id): Promise<void>{
      return this.productCategoryService.deleteProductCategory(id);
    }
}
