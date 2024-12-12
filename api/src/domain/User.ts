import Role from "./Role";

export interface User{
  id: string,
  username: string,
  password: string,
  roleId: number,

  role?: Role
}