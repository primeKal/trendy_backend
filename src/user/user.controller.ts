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

    @Get()
    @ApiProperty()
    public async getAUser(@Param('id') id: number): Promise<User>{
      return this.userService.getOneUserById(id);
    }

    @Post()
    public async createUser(@Body() body: CreateUserDto): Promise<User> {
      return this.userService.createUser(body);
    }

    @Put()
    public async editUser(@Body() body: EditUserDto): Promise<User> {

      return this.userService.editUser(body);
    }

    @Delete()
    public async deleteUser(@Body() id): Promise<void>{
      return this.userService.deleteUser(id);
    }
    //here is for login will create its own auth module for the future
    @Post("login")
    public async loginUser(@Body() loginUser: LoginUserDto, 
                            @Res({passthrough: true}) response: Response): Promise<any>{
      let user = await this.userService.findUserByEmail(loginUser.email)
      if(!user){
        throw new BadRequestException("Are you serious,please check again2"); 
      }
      if ( !await bcrypt.compare(loginUser.password,user.password)){
        console.log("this is the result", await bcrypt.compare(user.password, loginUser.password))
        throw new BadRequestException("Are you serious,please check again"); 
      }
      let token = await this.userService.generateToken({
        id : user.id,
      });
      response.cookie( 'jwt', token, {httpOnly: true})

      return {
        "message": "Congrats",
        "user": {...user.dataValues},
        "token": token
      };
    }
}
