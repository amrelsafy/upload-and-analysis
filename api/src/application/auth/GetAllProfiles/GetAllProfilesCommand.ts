import { Injectable } from "@nestjs/common";
import IGetAllProfilesCommand from "./IGetAllProfilesCommand";
import UserDTO from "src/domain/dto/UserDTO";
import { IUserRepository } from "src/interfaces/IUserRepository";

@Injectable()
export default class GetAllProfilesCommand implements IGetAllProfilesCommand{

  constructor(private usersRepository: IUserRepository){}

  async execute(): Promise<{users: UserDTO[]}> {
    let allUsers = await this.usersRepository.getAll();
    return {users: allUsers}
  }
  
}