import UserDTO from "src/domain/dto/UserDTO";

export default interface IGetAllProfilesCommand{
  execute(): Promise<{users: UserDTO[]}>
}