import { Book } from "./book";
import { User } from './user';

export interface CartItem {
    id: number;
    cart: Cart;
    book: Book;
    quantity: number;
}


export interface Cart {
  id: number;
  user: User;
}