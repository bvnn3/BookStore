import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Writer } from '../models/writer';
import { Publisher } from '../models/publisher';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080';
 
 
  constructor(private http: HttpClient, private userService: UserService) {}
 
  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/book/getAll`);
  }
  getWriters(): Observable<Writer[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Writer[]>(`${this.baseUrl}/writer/getAll`, {headers});
  }

  getPublishers(): Observable<Publisher[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Publisher[]>(`${this.baseUrl}/publisher/getAll`, {headers});
  }

  addBook(book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.post<Book>(`${this.baseUrl}/book/addBook`, book, {headers});
  }

  addWriter(writer: Writer): Observable<Writer> {
    const headers = this.getAuthHeaders();
    return this.http.post<Writer>(`${this.baseUrl}/writer/addWriter`, writer, {headers});
  }

  getBookById(bookId: string): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.baseUrl}/book/${bookId}`, {headers});
  }

  updateBook(book: Book): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.put<Book>(`${this.baseUrl}/book/updateBook`, book, {headers});
  }

  deleteBook(bookId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/book/${bookId}`, {headers});
  }
}
