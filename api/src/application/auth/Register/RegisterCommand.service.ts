import { User } from "src/domain/User";
import { IRegisterCommand } from "./IRegisterCommand";
import { BadRequestException, Injectable } from "@nestjs/common";
import UserDTO from "src/domain/dto/UserDTO";
import { IUserRepository } from "src/interfaces/IUserRepository";
import {v4 as uuidv4} from 'uuid';
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class RegisterCommand implements IRegisterCommand{
  constructor(private usersRepository: IUserRepository, private jwtService: JwtService){}
  async execute(user: UserDTO): Promise<{token: string, user: UserDTO}> {
    
    let existUser = await this.usersRepository.getByUsername(user.username);
    if(existUser)
      throw new BadRequestException('Username already exists');
    
    const id = uuidv4();
    let hashedPassword = await argon2.hash(user.password);

    let newUser: UserDTO = {
      ...user,
      id,
      password: hashedPassword,
      roleId: 2
    }

    let {password, ...userResult} = await this.usersRepository.create(newUser);

    let token = await this.jwtService.signAsync(userResult);

    return {
      token,
      user: userResult
    }
  }

}