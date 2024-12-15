import ILoginCommand from "./ILoginCommand";
import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UserDTO from "src/domain/dto/UserDTO";
import { IUserRepository } from "src/interfaces/IUserRepository";
import * as argon2 from "argon2";
import { User } from "src/domain/User";

@Injectable()
export default class LoginCommand implements ILoginCommand{

  constructor(private jwtService: JwtService, private usersRepository: IUserRepository){}

  async execute(userDTO: UserDTO): Promise<{token: string, user: UserDTO, message: string}> {
    let user = await this.usersRepository.getByUsername(userDTO.username);
    if(!user)
      throw new HttpException('Username or password are incorrect', 401);

    let passwordVerfication = await argon2.verify(user.password, userDTO.password);

    if(passwordVerfication){
      const { password, ...foundUser } = user;
      return {
        token: this.jwtService.sign(foundUser),
        user: foundUser,
        message: "User logged in successfully"
      };
    }
    else
      throw new HttpException('Username or password are incorrect', 401);

  }
  
}