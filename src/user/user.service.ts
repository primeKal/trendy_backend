import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/utils/constants';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUserDto';
// import { Socialmedia } from 'src/socialmedia/socialmedia.entity';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        private jwtService: JwtService
      ) {} 
      async getAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll<User>({
          // include: { model: Socialmedia, as: 'socialmedias' }
        });
      }
      async createUser(createUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
        return await this.userRepository.create<User>(createUserDto);
      }
      async getOneUserById(id:number): Promise<User>{
        return await this.userRepository.findOne( {
          where: {
            id: id
          }
        })
      }
      async editUser(edituser: EditUserDto): Promise<User> {
        var toEditUser = await this.userRepository.findByPk(edituser.id);
        try{

          return await toEditUser.update({...edituser})
        }
        catch (error){
          console.log(error.errors)
          return error.message;
        } 
      }
      async deleteUser(id: string): Promise<void>{
        var toDeleteUser = await this.userRepository.findByPk(id);
        return await toDeleteUser.destroy();
      }

      //authentiction methods will be its own module for the future

      async findUserByEmail(email: any): Promise<User>{
        return this.userRepository.findOne({
          where: { email: email},
          // include: { model: Socialmedia, as: 'socialmedias' }
        })
      }
      async generateToken(payload: any): Promise<any>{
        return await this.jwtService.signAsync(payload)
      }
}
