import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/review';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getReviewsByBookId(bookId: number): Observable<Review[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Review[]>(`${this.baseUrl}/getByBookId/${bookId}`, {headers});
  }

  createReview(review: Review): Observable<Review> {
    const headers = this.getAuthHeaders();
    return this.http.post<Review>(`${this.baseUrl}/addReview`, review, {headers});
  }

  deleteReview(reviewId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}`, {headers});
  }
}