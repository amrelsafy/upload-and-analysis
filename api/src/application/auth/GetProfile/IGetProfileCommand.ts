import { User } from "src/domain/User";

export default interface IGetProfileCommand{
  execute(user_id: string): Promise<User>
}