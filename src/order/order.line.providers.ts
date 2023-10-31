import { ORDER_LINE_REPOSITORY } from "src/utils/constants";
import { OrderLine } from "./order.line.entity";

export const orderLineProviders = [
    {
      provide: ORDER_LINE_REPOSITORY,
      useValue: OrderLine,
    },
  ];