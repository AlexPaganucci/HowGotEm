import { Order } from "./order";

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  roles: string[];
  address: string;
  city: string;
  postalCode: string;
  orders: Order[];
  birthdate: Date;
  speditionAddress: string,
  speditionCity: string,
  speditionPostalCode: string
}
