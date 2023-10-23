import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/utils/constants';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { Op } from 'sequelize';

@Injectable()
export class OrderService {
    constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order){
    }
    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.findAll<Order>({
          // include: { model: Socialmedia, as: 'socialmedias' }
        });
      }
      async createOrder(createOrderDto: OrderDto): Promise<Order> {
        return await this.orderRepository.create<Order>(createOrderDto);
      }
      async getOneOrderById(id: number): Promise<Order> {
        return await this.orderRepository.findOne({
          where: {
            id: id
          }
        })
      }
      async editOrder(editOrder: OrderDto): Promise<Order> {
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
}
