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
import { OrderLine } from './order.line.entity';

const tableOptions = {
  tableName: 'orders',
}

@Table(tableOptions)
export class Order extends Model<Order> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    allowNull: false,
  })
  totalTax: number;

  @Column({
    allowNull: true,
  })
  currency: string;


  @Column({
    allowNull: true,
  })
  uniqueCode: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  isActive: boolean;

  @Column({
    allowNull: false,
    defaultValue: false
  })
  success: string;

  @Column({
    defaultValue: 0
  })
  linkCount: number;


  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  // forign keys

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT
  })
  userId: number;

  @BelongsTo(() => User)
  @ApiProperty({ type: User })
  user: User;

  @HasMany(() => OrderLine)
  orderlines: OrderLine[]

}