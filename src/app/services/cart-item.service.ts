import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private apiUrl = 'http://localhost:8080/cartItem';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  addToCart(cartItem: CartItem): Observable<CartItem> {
    const headers = this.getAuthHeaders();
    return this.http.post<CartItem>(`${this.apiUrl}/addCartItem`, cartItem, {
      headers,
    });
  }

  findCartItemsByUserId(userId: number): Observable<CartItem[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CartItem[]>(
      `${this.apiUrl}/findByCart_User_Id/${userId}`,
      { headers }
    );
  }

  deleteCartItem(cartItemId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`, {headers});
  }

  deleteAllCartItems(userId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteByCart_User_Id/${userId}`, { headers });
  }

}
