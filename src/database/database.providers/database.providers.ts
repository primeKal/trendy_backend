import { Sequelize } from 'sequelize-typescript';
import { ProductCategory, ProductCategoryProduct } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { Role, UserRole,  } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-mute-violet-76705724.us-east-1.postgres.vercel-storage.com',
        port: 5432,
        username: 'default',
        password: 'pTv75EHAJIws',
        database: 'trendy_merches',
        ssl: true,
        dialectOptions: {
          ssl: true
        }
      });
      sequelize.addModels([User,Role, UserRole,Product, ProductCategory,ProductCategoryProduct]);
      await sequelize.sync({alter: true});
      return sequelize;
    },
  },
];