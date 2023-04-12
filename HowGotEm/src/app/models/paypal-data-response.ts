import { User } from "./user";

export interface PaypalDataResponse {
  idTransaction: String,
  user: User,
  time: String,
  totalPrice: number
}
