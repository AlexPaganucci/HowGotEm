import { Role } from "./role";

export interface SignupRequest {
email: string,
name: string,
surname: string,
password: string,
confirmPassword: string,
address: string,
city: string,
postalCode: string,
birthdate: Date
}
