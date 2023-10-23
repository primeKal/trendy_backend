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
    BelongsToMany,
    ForeignKey,
  } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
  
  const tableOptions = {
    tableName: 'roles',
  }
  
  @Table(tableOptions)
  export class Role extends Model<Role> {
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
      unique: true,
    })
    code: string;
  
    @Column({
      allowNull: false,
      defaultValue: false
    })
    isActive: boolean;
  
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  
    @BelongsToMany(() => User, ()=>UserRole)
    @ApiProperty({ type: () => [User] })
    users: User[];

  }


@Table
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })

  userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })

  roleId: number;

}