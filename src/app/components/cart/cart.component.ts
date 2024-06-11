import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartItems: CartItem[] = [];
  userId: number = 0;
  totalCost: number = 0;
  constructor(private cartItemService: CartItemService) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).id;
    const userId = this.userId;
    this.cartItemService.findCartItemsByUserId(userId).subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error(err)
    });
  }

  deleteCartItem(cartItemId: number): void {
    this.cartItemService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      error: (err) => console.error(err)
    });
  }

  deleteAllCartItems(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).id;
    const userId = this.userId;
    this.cartItemService.deleteAllCartItems(userId).subscribe({
      next: () => {
        this.cartItems = [];
      },
      error: (err) => console.error(err)
    });
  }
  calculateTotalCost(): void {
    this.totalCost = this.cartItems.reduce((acc, item) => acc + (item.book.price * item.quantity), 0);
    alert(`Total cost: ${this.totalCost} $`);
    this.deleteAllCartItems();
  }
}
