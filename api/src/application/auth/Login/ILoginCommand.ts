import UserDTO from "src/domain/dto/UserDTO";

export default interface ILoginCommand{
  execute(userDTO: UserDTO): Promise<{token: string, user: UserDTO}>
}