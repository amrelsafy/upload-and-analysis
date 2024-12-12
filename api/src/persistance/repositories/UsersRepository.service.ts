import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/User.entity";
import { EntityManager, Repository } from "typeorm";
import UserDTO from "src/domain/dto/UserDTO";
import {v4 as uuidv4} from 'uuid';
import { IUserRepository } from "src/interfaces/IUserRepository";
import { User } from "src/domain/User";

@Injectable()
export default class UsersRepository implements IUserRepository{

  constructor(@InjectRepository(UserEntity)
              private usersRepository: Repository<UserEntity>,
              private entityManager: EntityManager){}
  
  async getAll(): Promise<User[]>{
    try{
      return await this.usersRepository.find({
        select: ['id', 'username', 'roleId']
      });
    } 
    catch(e){
      throw new Error('Error getting all profiles');
    }
  }            
  
  async getById(id: string): Promise<User> {
    try{
      return await this.usersRepository.findOne({
        where: {
          id
        }
      })
    }
    catch(e){
      throw new Error(`Error finding user with id ${id}`);
    }
  }

  async getByUsername(username: string): Promise<User> {
    try{
    return await this.usersRepository.findOne({
        where: {
          username
        }
      })
    }
    catch(e){
      throw new Error(`Error fetching user with id `)
    }
  }

  async create(userDTO: UserDTO){
    let user = new UserEntity(userDTO);
    try{
      await this.entityManager.save(user);
      return user;
    }
    catch(e){
      throw new Error(`Error registering user with username ${userDTO.username}`);
    }
  }
}