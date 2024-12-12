import Role from "src/domain/Role";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity()
export class RoleEntity implements Role{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  constructor(role: Partial<Role>){
    Object.assign(this, role);
  }
}