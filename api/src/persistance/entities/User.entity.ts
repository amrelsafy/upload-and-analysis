import { User } from "src/domain/User";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";
import FileMetadataEntity from "./FileMetadata.entity";

@Entity()
export class UserEntity implements User{
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  roleId: number
  
  @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'roleId'})
  role: RoleEntity;

  @OneToMany(() => FileMetadataEntity, (fileMetadata) => fileMetadata.user)
  fileMetadata: FileMetadataEntity[]

  constructor(user: Partial<User>){
    Object.assign(this, user);
  }
}