import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){

    }
    public signupUser(toCreateUser: CreateUserDto): Promise<User>{
        return this.userService.createUser(toCreateUser);
    }
}
