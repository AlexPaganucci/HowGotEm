import { Shoe, Size } from "./shoe";
import { User } from "./user";

export interface Order {
  id: number,
  user: User,
  shoes: Array<OrderShoe>,
  totalPrice: number,
  orderDate: Date
}

export interface OrderShoe {
  id: number,
  shoe: Shoe,
  size: Size,
  quantities: number;
  oder: Order
}
