import { OrderShoeRequest } from "./order-shoe-request";

export interface OrderRequest {
  userId: number,
  shoes: OrderShoeRequest[]
}
