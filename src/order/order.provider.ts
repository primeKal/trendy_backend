import { ORDER_REPOSITORY } from "src/utils/constants";
import { Order } from "./order.entity";

export const orderProviders = [
    {
      provide: ORDER_REPOSITORY,
      useValue: Order,
    },
  ];