import { Body, Controller, Get, Post, Put, Delete, Param, BadRequestException, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { EditUserDto } from './dto/editUserDto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from "bcrypt";
import { Response } from 'express';
import { JwtAuthGurad } from 'src/auth/guards/jwtAuthGuard';

@ApiTags('Users')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    // @UseGuards(JwtAuthGurad)
    @Get()
    public async getUsers(): Promise<User[]> {
      return this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiProperty()
    public async getAUser(@Param('id') id: number): Promise<User>{
      return this.userService.getOneUserById(id);
    }

    @UseGuards(JwtAuthGurad)
    @Post()
    public async createUser(@Body() body: CreateUserDto): Promise<User> {
      return this.userService.createUser(body);
    }

    @UseGuards(JwtAuthGurad)
    @Put()
    public async editUser(@Body() body: EditUserDto): Promise<User> {

      return this.userService.editUser(body);
    }

    @UseGuards(JwtAuthGurad)
    @Delete()
    public async deleteUser(@Body() id): Promise<void>{
      return this.userService.deleteUser(id);
    }
}
