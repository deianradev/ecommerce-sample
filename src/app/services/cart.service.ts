import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItems.next(updatedItems);
    } else {
      this.cartItems.next([...currentItems, { product, quantity: 1 }]);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems.getValue();
  }

  getCartCount(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.quantity, 0);
  }

  isInCart(productId: number): boolean {
    return this.cartItems.getValue().some(item => item.product.id === productId);
  }

  getItemQuantity(productId: number): number {
    const item = this.cartItems.getValue().find(item => item.product.id === productId);
    return item?.quantity || 0;
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    this.cartItems.next(updatedItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
  }
}