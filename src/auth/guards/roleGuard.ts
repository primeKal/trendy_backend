import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from 'src/user/user.entity';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRole: number) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user : User = request.user;

    // Check if the user has the required role
    const hasRole = user.roles?.some( role => role.id == this.requiredRole);
    if (!hasRole) {
        console.log("does not have the required role")
      throw new ForbiddenException('You do not have permission to access this resource.');
    }

    return true;
  }
}