import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
        });  
    }
    async validate(payload: any){
      let user = await this.userService.getOneUserById(payload.id)
      if (!user){
        throw new UnauthorizedException();
      }
      return user.dataValues
    }
}