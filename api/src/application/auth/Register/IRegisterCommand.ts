import UserDTO from "src/domain/dto/UserDTO";
import { User } from "src/domain/User";

export interface IRegisterCommand{
  execute(item: UserDTO): Promise<{token: string, user: UserDTO, message: string}>;
}