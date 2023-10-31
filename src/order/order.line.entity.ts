import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
    BelongsTo,
    ForeignKey,
    BelongsToMany,
  } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
  
  const tableOptions = {
    tableName: 'order_lines',
  }
  
  @Table(tableOptions)
  export class OrderLine extends Model<OrderLine> {
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    })
    public id: number;
  
    @Column({
      allowNull: true,
    })
    name: string;
  
    @Column({
      allowNull: true,
    })
    totalPrice: number;

    @Column({
        allowNull: false,
      })
    singlePrice: number;
  
    @Column({
      allowNull: true,
    })
    currency: string;
  
  
    @Column({
      allowNull: false,
      unique: true
    })
    quantity: number;
  
    @Column({
      allowNull: false,
      defaultValue:true
    })
    isActive: boolean;
  
  
    @Column({
      defaultValue: 0
    })
    linkCount: number;
  
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  
    // forign keys

    //created by user
    @ForeignKey(() => User)
    @Column({
      type: DataType.BIGINT
    })
    userId: number;
  
    @BelongsTo(() => User)
    @ApiProperty({ type : User })
    user: User;

    // order 
    @ForeignKey(() => Order)
    @Column({
      type: DataType.BIGINT
    })
    orderId: number;
  
    @BelongsTo(() => Order)
    @ApiProperty({ type : Order })
    order: Order;

    // product id
    @ForeignKey(() => Product)
    @Column({
      type: DataType.BIGINT
    })
    productId: number;
  
    @BelongsTo(() => Product)
    @ApiProperty({ type : Product })
    product: Product;


  }