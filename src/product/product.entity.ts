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
import { ProductCategory, ProductCategoryProduct } from 'src/product-category/product.category.entity';
import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';
  // import { Socialmedia } from 'src/socialmedia/socialmedia.entity';
  
  const tableOptions = {
    tableName: 'product',
  }
  
  @Table(tableOptions)
  export class Product extends Model<Product> {
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
      allowNull: false,
    })
    price: number;
  
    @Column({
      allowNull: true,
    })
    currency: string;
  
  
    @Column({
      allowNull: false,
      unique: true
    })
    uniqueCode: string;
  
    @Column({
      allowNull: false,
    })
    quantity: number;
  
    @Column({
      allowNull: false,
      defaultValue:true
    })
    isActive: boolean;
  
    @Column({
      allowNull: true,
    })
    sold: string;
  
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
    @ApiProperty({ type : User })
    user: User;

    @BelongsToMany(() => ProductCategory, () => ProductCategoryProduct)
    @ApiProperty({ type: () => [ProductCategory] })
    productCategories: Product[];
  }