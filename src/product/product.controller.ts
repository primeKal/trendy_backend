import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Product } from './product.entity';

import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){
    }
        // @UseGuards(JwtAuthGurad)
        @Get()
        public async getProducts(): Promise<Product[]> {
          return this.productService.getAllProducts();
        }
    
        @Get(':id')
        @ApiProperty()
        public async getAProduct(@Param('id') id: number): Promise<Product>{
          return this.productService.getOneProductById(id);
        }
    
        @Post()
        public async createProduct(@Body() body: CreateProductDto): Promise<Product> {
          return this.productService.createProduct(body);
        }
    
        @Put()
        public async editUser(@Body() body: EditProductDto): Promise<Product> {
    
          return this.productService.editProduct(body);
        }
    
        @Delete()
        public async deleteUser(@Body() id): Promise<void>{
          return this.productService.deleteProduct(id);
        }
}
