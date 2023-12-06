import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){

    }
    public signupUser(toCreateUser: CreateUserDto): Promise<User>{
        if( toCreateUser.roleIds.includes(1)){
            throw new UnprocessableEntityException(); 
        }
        return this.userService.createUser(toCreateUser);
    }
}
