import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Order } from 'src/order/order.entity';
import { JwtAuthGurad } from 'src/auth/guards/jwtAuthGuard';




@UseGuards(JwtAuthGurad)
@Controller('reports')
export class ReportsController {


    constructor(private readonly reportsService: ReportsService) { }


    @Get('/getOrdersByDate/:date')
    public async getOrdersByDate(@Param('date') date: string,@Req() req: any): Promise<Order[]> {
        const dateToFetch = new Date(date);
        console.log(req.user)
        return this.reportsService.getOrdersByDay(dateToFetch, req.user.id);
    }

    @Get('GetOrderCountOf15Days')
    public async getOrdersCount(@Req() req: any): Promise<any> {
        const totalOrdersPerDay = await this.reportsService.getTotalOrdersPerDay(req.user.id);
        console.log(totalOrdersPerDay);
        return totalOrdersPerDay;
    }
    @Get('GetMostSoldProductsIn15Days')
    public async getMostSOldProduct(@Req() req: any): Promise<any> {
        const mostSoldProducts = await this.reportsService.getMostSoldProducts(req.user.id);
        console.log(mostSoldProducts);
        return mostSoldProducts;
    }

    @Get('getTotalSalesForPast30Days')
    public async getTotalSalesForPast30Days(@Req() req: any): Promise<any> {
        const getTotalSalesForPast30Days = await this.reportsService.getTotalSalesForPast30Days(req.user.id);
        console.log(getTotalSalesForPast30Days);
        return getTotalSalesForPast30Days;
    }

    @Get('getTotalSalesPerMonth')
    public async getTotalSalesPerMonth(@Req() req: any): Promise<any> {
        const getTotalSalesPerMonth = await this.reportsService.getTotalSalesPerMonth(req.user.id);
        console.log(getTotalSalesPerMonth);
        return getTotalSalesPerMonth;
    }







}
