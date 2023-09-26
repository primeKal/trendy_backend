import { Body, Delete, Get, Inject, Injectable, Param, Post, Put } from '@nestjs/common';
import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from 'src/utils/constants';

import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';

@Injectable()
export class ProductService {
    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product){
    }
    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll<Product>({
          // include: { model: Socialmedia, as: 'socialmedias' }
        });
      }
      async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productRepository.create<Product>(createProductDto);
      }
      async getOneProductById(id:number): Promise<Product>{
        return await this.productRepository.findOne( {
          where: {
            id: id
          }
        })
      }
      async editProduct(editProduct: EditProductDto): Promise<Product> {
        var toEditProduct = await this.productRepository.findByPk(editProduct.id);
        try{

          return await toEditProduct.update({...editProduct})
        }
        catch (error){
          console.log(error.errors)
          return error.message;
        } 
      }
      async deleteProduct(id: string): Promise<void>{
        var toDeleteProduct = await this.productRepository.findByPk(id);
        return await toDeleteProduct.destroy();
      }


}
