import { Shoe } from "./shoe";

export interface Cart {
  userId: string,
  shoes: Shoe[],
  totalPrice: number
}
