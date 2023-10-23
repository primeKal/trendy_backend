import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleDto } from './dto/role.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService){

    }
    @Get()
    public async getRoles(): Promise<Role[]> {
      return this.roleService.getAllRoles();
    }

    @Get()
    @ApiProperty()
    public async getARole(@Param('id') id: number): Promise<Role>{
      return this.roleService.getOneRoleById(id);
    }

    @Post()
    public async createRole(@Body() body: RoleDto): Promise<Role> {
      return this.roleService.createRole(body);
    }

    @Put()
    public async editRole(@Body() body: RoleDto): Promise<Role> {

      return this.roleService.editRole(body);
    }

    @Delete()
    public async deleteRole(@Body() id): Promise<void>{
      return this.roleService.deleteRole(id);
    }
}
