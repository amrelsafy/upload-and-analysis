import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/Role.entity";
import { Repository } from "typeorm";
import Role from "src/domain/Role";
import { UserEntity } from "../entities/User.entity";
import { User } from "src/domain/User";

@Injectable()
export class RolesMigrations implements OnApplicationBootstrap{
  constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
              @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}
  
  async onApplicationBootstrap() {
    await this.seedRoles();
    await this.seedAdmin();
  }

  private async seedRoles(){
    try{
      const rolesCount = await this.roleRepository.count();
      if(rolesCount > 0)
        console.log('Roles already populated')

      const roles: Role[] = [{id: 1, role: 'Admin'}, {id: 2, role: 'User'}]

      await this.roleRepository.save(roles);
    }
    catch(e){
      throw new Error('Error initialzing roles in database');
    }
  }

  private async seedAdmin(){
    try{
      const existsAdmin = await this.userRepository.findOne({
        where: {
          username: 'admin'
        }
      })

      if(!existsAdmin){
        const admin: User = {
          id: '1',
          username: 'admin',
          password: 'admin',
          roleId: 1
        }

        await this.userRepository.save(admin);
      }
    }
    catch(e){
      throw new Error('Error adding admin to database');
    }
  }
}