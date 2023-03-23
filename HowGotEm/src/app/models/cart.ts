import { Shoe, Size } from "./shoe";

export interface Cart {
  userId: string,
  shoes: CartShoe[],
  totalPrice: number
}

export interface CartShoe {
  shoe: Shoe,
  sizes: CartSize[]
}

export interface CartSize {
  size: Size,
  quantityOrdered: number,
}
