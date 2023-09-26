
import { PRODUCT_REPOSITORY } from '../utils/constants';
import { Product } from './product.entity';

export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];