import { Inject, Injectable } from '@nestjs/common';
import { ORDER_LINE_REPOSITORY, ORDER_REPOSITORY } from 'src/utils/constants';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { Op } from 'sequelize';
import { OrderLine } from './order.line.entity';

@Injectable()
export class OrderService {
    constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
                @Inject(ORDER_LINE_REPOSITORY) private readonly orderLineRepository){
    }
    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.findAll<Order>({
          include: [OrderLine]
        });
      }
      async createOrder(createOrderDto: any): Promise<Order> {

        return await this.orderRepository.create<Order>(createOrderDto, {
          include: [OrderLine]
        });
      }
      async getOneOrderById(id: number): Promise<Order> {
        return await this.orderRepository.findOne({
          where: {
            id: id
          },
          include: [OrderLine]
        })
      }
      async editOrder(editOrder: any): Promise<Order> {
        var toEditOrder = await this.orderRepository.findByPk(editOrder.id);
        try {
    
          return await toEditOrder.update({ ...editOrder })
        }
        catch (error) {
          console.log(error.errors)
          return error.message;
        }
      }
      async deleteOrder(id: string): Promise<void> {
        var toDeleteOrder = await this.orderRepository.findByPk(id);
        return await toDeleteOrder.destroy();
      }
      async getOrdersByIds(ids:Array<number>) {
        return await this.orderRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }
    async createOrderLines(orderlines : any){
      var result = this.orderLineRepository.create(orderlines);
    }
    async getOrdersByUser(userId: number): Promise<any>{
      return this.orderRepository.findAll({
        where: {
          userId: userId
        },
        include: [OrderLine]
      })
    }
}
