import { Publisher } from "./publisher";
import { Writer } from "./writer";

export interface Book {
  id: number;
  bookTitle: string;
  bookImageUrl: string;
  bookGenre: string;
  price: number;
  bookYear: number;
  writer: Writer;
  publisher: Publisher;
}
