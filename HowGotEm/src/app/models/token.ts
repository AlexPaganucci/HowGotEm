import { Role } from "./role";

export interface Token {
  token: string;
  type: string;
  id: number;
  email: string;
  roles: Role[];
}
