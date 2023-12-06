import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGurad } from 'src/auth/guards/jwtAuthGuard';
import { RoleGuard } from 'src/auth/guards/roleGuard';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
    constructor(private orderService : OrderService){

    }
    
    @UseGuards(JwtAuthGurad, new RoleGuard(1))
    @Get()
    public async getOrders(): Promise<Order[]> {
      return this.orderService.getAllOrders();
    }

    @UseGuards(JwtAuthGurad)
    @Get(':id')
    @ApiProperty()
    public async getAOrder(@Param('id') id: number): Promise<Order>{
      return this.orderService.getOneOrderById(id);
    }

    @UseGuards(JwtAuthGurad)
    @Post()
    public async createOrder(@Body() body: OrderDto): Promise<Order> {
      return this.orderService.createOrder(body);
    }

    @UseGuards(JwtAuthGurad)
    @Put()
    public async editOrder(@Body() body: OrderDto): Promise<Order> {

      return this.orderService.editOrder(body);
    }

    @UseGuards(JwtAuthGurad)
    @Delete()
    public async deleteOrder(@Body() id): Promise<void>{
      return this.orderService.deleteOrder(id);
    }

    @UseGuards(JwtAuthGurad)
    @Get('ByUser/:id')
    public async getOrdersByUser(@Param('id') id: number): Promise<[Order]>{
      return this.orderService.getOrdersByUser(id);
    }
}
