import { User } from './user';
import { Book } from './book';

export interface Review {
  id: number;
  user: User;
  book: Book;
  userReview: string;
}