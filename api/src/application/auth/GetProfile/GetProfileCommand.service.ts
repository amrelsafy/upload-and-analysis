import { User } from "src/domain/User";
import IGetProfileCommand from "./IGetProfileCommand";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/interfaces/IUserRepository";

@Injectable()
export default class GetProfileCommand implements IGetProfileCommand{

  constructor(private usersRepository: IUserRepository){}

  async execute(user_id: string): Promise<User> {
    let user = await this.usersRepository.getById(user_id);
    if (!user)
      throw new NotFoundException(`User with ${user_id} has not been found`);

    return user;
  }
  
}