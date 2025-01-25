import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
// import { NotificationService } from '../../services/notification.service';
//TODO
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <a [routerLink]="['/products', product.id]" class="block relative aspect-[4/5] overflow-hidden flex-shrink-0">
        <img [src]="product.imageUrl" [alt]="product.name" 
             class="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500">
        @if (isInCart) {
          <div class="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
            In Cart ({{quantity}})
          </div>
        }
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span class="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-primary">
            View Details
          </span>
        </div>
      </a>
      <div class="p-6 flex-grow flex flex-col">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
            {{product.name}}
          </h3>
          <span class="text-lg font-bold text-primary">
            {{product.price | currency}}
          </span>
        </div>
        <p class="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">{{product.description}}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {{product.careLevel}} care
          </span>
          <span class="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
            {{product.lightRequirement}} light
          </span>
        </div>
        <button 
          (click)="addToCart(); $event.stopPropagation()"
          class="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-secondary 
                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                 transform hover:-translate-y-0.5 active:translate-y-0"
          [disabled]="!product.inStock">
          @if (isInCart) {
            Add Another
          } @else {
            {{product.inStock ? 'Add to Cart' : 'Out of Stock'}}
          }
        </button>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  
  constructor(
    private cartService: CartService,
    // private notificationService: NotificationService
  ) {}

  get isInCart(): boolean {
    return this.cartService.isInCart(this.product.id);
  }

  get quantity(): number {
    return this.cartService.getItemQuantity(this.product.id);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    // this.notificationService.show(`${this.product.name} added to cart`);
  }
}