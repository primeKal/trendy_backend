import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { ROLE_REPOSITORY } from 'src/utils/constants';
import { RoleDto } from './dto/role.dto';
import { Op } from 'sequelize';

@Injectable()
export class RoleService {
    constructor(@Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,){
        
    }
    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.findAll<Role>({
        });
      }
      async createRole(createRoleDto): Promise<Role> {
        return await this.roleRepository.create<Role>(createRoleDto);
      }
      async getOneRoleById(id:number): Promise<Role>{
        return await this.roleRepository.findOne( {
          where: {
            id: id
          }
        })
      }
      async editRole(edituser: RoleDto): Promise<Role> {
        var toEditRole = await this.roleRepository.findByPk(edituser.id);
        try{

          return await toEditRole.update({...edituser})
        }
        catch (error){
          console.log(error.errors)
          return error.message;
        } 
      }
      async deleteRole(id: string): Promise<void>{
        var toDeleteRole = await this.roleRepository.findByPk(id);
        return await toDeleteRole.destroy();
      }
      async getRolesByIds(ids:Array<number>) {
        return await this.roleRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }
}
