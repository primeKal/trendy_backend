import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { roleProviders } from './role.provider';

@Module({
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
  exports:[RoleService]
})
export class RoleModule {}
