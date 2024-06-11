import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart, CartItem } from '../models/cartItem';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

 
  getCartByUserId(userId: number): Observable<Cart> {
    const headers = this.getAuthHeaders();
    return this.http.get<Cart>(`${this.baseUrl}/getByUserId/${userId}`, { headers });
  }
}
