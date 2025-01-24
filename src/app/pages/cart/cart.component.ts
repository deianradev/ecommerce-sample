import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Back Navigation -->
      <nav class="mb-6">
        <a routerLink="/products" 
           class="text-primary hover:text-secondary transition-colors inline-flex items-center gap-2">
          <span>←</span>
          <span>Continue Shopping</span>
        </a>
      </nav>

      <h2 class="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h2>
      
      @if (cartItems.length) {
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 lg:mb-0">
              <div class="space-y-4">
                @for (item of cartItems; track item.product.id) {
                  <div class="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b">
                    <!-- Product Image and Details -->
                    <div class="flex items-center gap-4 flex-grow">
                      <img [src]="item.product.imageUrl" 
                           [alt]="item.product.name"
                           class="w-20 h-20 object-cover rounded-lg">
                      <div class="flex-grow">
                        <h3 class="font-semibold">{{ item.product.name }}</h3>
                        <p class="text-gray-600">{{ item.product.price | currency }}</p>
                      </div>
                    </div>

                    <!-- Quantity Controls and Total -->
                    <div class="flex items-center justify-between sm:justify-end gap-4">
                      <div class="flex items-center gap-2">
                        <button (click)="updateQuantity(item, -1)"
                                class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center
                                       hover:bg-gray-100 transition-colors">
                          -
                        </button>
                        <span class="w-8 text-center">{{ item.quantity }}</span>
                        <button (click)="updateQuantity(item, 1)"
                                class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center
                                       hover:bg-gray-100 transition-colors">
                          +
                        </button>
                      </div>
                      <div class="text-right min-w-[80px]">
                        <div class="font-semibold">
                          {{ item.product.price * item.quantity | currency }}
                        </div>
                        <button (click)="removeItem(item)"
                                class="text-sm text-red-500 hover:text-red-700 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold">{{ total | currency }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span class="font-semibold">{{ shipping | currency }}</span>
                </div>
                <div class="flex justify-between pt-3 border-t">
                  <span class="font-semibold">Total</span>
                  <span class="font-bold text-lg">{{ total + shipping | currency }}</span>
                </div>
              </div>

              <button class="w-full bg-primary text-white px-6 py-3 rounded-lg 
                           hover:bg-secondary transition-colors text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-sm p-6 text-center max-w-md mx-auto">
          <div class="text-4xl mb-4">🛒</div>
          <h3 class="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p class="text-gray-600 mb-6">
            Looks like you haven't added any plants to your cart yet.
          </p>
          <a routerLink="/products" 
             class="inline-block bg-primary text-white px-6 py-3 rounded-lg 
                    hover:bg-secondary transition-colors">
            Start Shopping
          </a>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  shipping = 5.99;

  constructor(private cartService: CartService) {}

  get cartItems(): CartItem[] {
    return this.cartService.getCartItems();
  }

  get total(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      this.cartService.updateQuantity(item.product.id, newQuantity);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }
}