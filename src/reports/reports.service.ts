import { Injectable, Inject } from '@nestjs/common';
import {  Op, Sequelize } from 'sequelize';
import { Order } from 'src/order/order.entity';
import { OrderLine } from 'src/order/order.line.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { ORDER_REPOSITORY, ORDER_LINE_REPOSITORY, PRODUCT_CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from 'src/utils/constants';


@Injectable()
export class ReportsService {

    
    constructor(
        @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
        @Inject(ORDER_LINE_REPOSITORY) private readonly orderLineRepository: typeof OrderLine,
        @Inject(PRODUCT_CATEGORY_REPOSITORY) private readonly productCategoryRepository: typeof ProductCategory,
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product
    ) {

    }
    async getOrdersByDay(date: Date, userId: number): Promise<Order[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        try {
            const orders = await this.orderRepository.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startOfDay, endOfDay],
                    },
                    // userId: userId
                },

            });

            return orders;
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    }

    async getTotalOrdersPerDay(userId: number): Promise<{ date: string; totalOrders: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 100);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'date'],
                    [Sequelize.fn('count', Sequelize.col('id')), 'totalOrders'],
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // userId: userId
                },
                group: ['date'],
                order: [['date', 'DESC']],
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                date: result.get('date'),
                totalOrders: result.get('totalOrders'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total orders per day: ${error.message}`);
        }
    }

    async getMostSoldProducts(userId: number): Promise<{ productName: string; totalQuantity: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 100);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderLineRepository.findAll({
                attributes: [
                    'productId',
                    [
                        Sequelize.literal('SUM("OrderLine"."quantity")'),
                        'totalQuantity',
                    ],
                ],
                include: [
                    {
                        model: Product,
                        attributes: ['name'],
                    },
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // userId: userId
                },
                group: ['productId','product.id'],
                order: [[Sequelize.literal('product.name'), 'DESC']],
                limit: 10, // Change the limit based on your requirements
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                productName: result.product.name,
                totalQuantity: result.get('totalQuantity'),
                produtID: result.get('productId')
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching most sold products: ${error.message}`);
        }
    }


    async getTotalSalesForPast30Days(userId: number): Promise<{ date: string; totalSales: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 100);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [
                        Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')),
                        'date',
                    ],
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalSales'],
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // userId: userId
                },
                group: ['date'],
                order: [['date', 'DESC']],
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                date: result.get('date'),
                totalSales: result.get('totalSales'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total sales for the past 30 days: ${error.message}`);
        }
    }


    async getTotalSalesPerMonth(userId: number): Promise<{ month: string; totalSales: number }[]> {
        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [
                        Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt')),
                        'month',
                    ],
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalSales'],
                ],
                group: ['month'],
                order: [['month', 'DESC']],
                where: {
                    // userId: userId
                }
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                month: result.get('month'),
                totalSales: result.get('totalSales'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total sales per month: ${error.message}`);
        }
    }

}
