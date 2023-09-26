import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule,   JwtModule.register({
    secret: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
    privateKey:'sdlklkdsasalkdaslksa',
    signOptions: {expiresIn: "1d" }
  })],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService]
})
export class UserModule {}
