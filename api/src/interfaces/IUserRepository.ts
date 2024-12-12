import UserDTO from "src/domain/dto/UserDTO";
import { User } from "src/domain/User";

export abstract class IUserRepository{
  abstract getAll(): Promise<User[]>
  abstract getById(id: string): Promise<User>;
  abstract getByUsername(username: string): Promise<User>;
  abstract create(userDTO: UserDTO): Promise<User>;
}