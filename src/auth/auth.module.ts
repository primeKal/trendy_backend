import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [UserModule,
    PassportModule,
    JwtModule.register({
      secret: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
      // privateKey:'sdlklkdsasalkdaslksa',
      signOptions: { expiresIn: "1d" }
    })]
})
export class AuthModule { }
