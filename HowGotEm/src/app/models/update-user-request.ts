import { Role } from "./role";

export interface UpdateUserRequest {
  email: string,
  name: string,
  surname: string,
	roles: Role[],
  password: string,
  confirmPassword: string
}
