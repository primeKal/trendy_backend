import { ORDER_LINE_REPOSITORY, ORDER_REPOSITORY } from "src/utils/constants";
import { Order } from "./order.entity";
import { OrderLine } from "./order.line.entity";

export const orderProviders = [
    {
      provide: ORDER_REPOSITORY,
      useValue: Order,
    },
  ];
