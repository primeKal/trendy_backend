import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { JwtAuthGurad } from './guards/jwtAuthGuard';
import { LocalAuthGuard } from './guards/localAuthGuards';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){

  }
  @UseGuards(LocalAuthGuard)
  @Post("login")
  public async loginUser(@Body() loginUser: LoginUserDto, @Req() req) {
    return req.user
  }

  @Post("signup")
  public async signupUser(@Body() signupUser: CreateUserDto, @Req() req) {
    let user = this.authService.signupUser(signupUser);
    return user
  }
}
