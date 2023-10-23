import { Inject, Injectable } from '@nestjs/common';
import { ProductCategory } from './product.category.entity';
import { PRODUCT_CATEGORY_REPOSITORY } from 'src/utils/constants';
import { ProductCategoryDto } from './dto/product.category.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ProductCategoryService {
    constructor(@Inject(PRODUCT_CATEGORY_REPOSITORY) private readonly productCategoryRepository: typeof ProductCategory,
                private productsService: ProductService){

    }

    async getAllProductCategories(): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.findAll<ProductCategory>({
          // include: { model: Socialmedia, as: 'socialmedias' }
        });
      }
      async createProductCategory(createProductCategoryDto): Promise<ProductCategory> {
        let newProductCategory = await this.productCategoryRepository.create<ProductCategory>(createProductCategoryDto);
        let products = await this.productsService.getProductsByIds(createProductCategoryDto.productIds)
        await newProductCategory.$set('products', products)
        return newProductCategory
      }
      async getOneProductCategoryById(id: number): Promise<ProductCategory> {
        return await this.productCategoryRepository.findOne({
          where: {
            id: id
          }
        })
      }
      async editProductCategory(editProductCategory): Promise<ProductCategory> {
        var toEditProductCategory = await this.productCategoryRepository.findByPk(editProductCategory.id);
        try {
    
          return await toEditProductCategory.update({ ...editProductCategory })
        }
        catch (error) {
          console.log(error.errors)
          return error.message;
        }
      }
      async deleteProductCategory(id: string): Promise<void> {
        var toDeleteProductCategory = await this.productCategoryRepository.findByPk(id);
        return await toDeleteProductCategory.destroy();
      }
}
