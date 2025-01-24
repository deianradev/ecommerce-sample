import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-background via-white to-background">
      @if (loading) {
        <app-loading-spinner />
      } @else if (product) {
        <div class="container mx-auto px-4 py-8 animate-fadeIn">
          <!-- Back Navigation -->
          <nav class="mb-6 md:mb-8">
            <a routerLink="/products" 
               class="text-primary hover:text-secondary transition-colors inline-flex items-center gap-2">
              <span>←</span>
              <span>Back to Products</span>
            </a>
          </nav>
          
          <div class="lg:grid lg:grid-cols-2 lg:gap-12">
            <!-- Left Column: Image and Features -->
            <div class="space-y-6 md:space-y-8 mb-8 lg:mb-0">
              <!-- Product Image -->
              <div class="relative rounded-2xl overflow-hidden shadow-lg">
                <img [src]="product.imageUrl" [alt]="product.name"
                     class="w-full aspect-square object-cover">
                <div class="absolute top-4 right-4">
                  <span class="bg-white px-4 py-2 rounded-lg text-lg font-bold text-primary shadow-lg">
                    {{product.price | currency}}
                  </span>
                </div>
              </div>

              <!-- Mobile Add to Cart -->
              <div class="lg:hidden">
                <button 
                  (click)="addToCart()"
                  class="w-full bg-primary text-white px-6 py-4 rounded-lg text-lg font-semibold
                         hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  [disabled]="!product.inStock">
                  {{product.inStock ? 'Add to Cart' : 'Out of Stock'}}
                </button>
              </div>

              <!-- Features -->
              <div class="grid grid-cols-3 gap-3 md:gap-4">
                <div class="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                  <div class="text-2xl md:text-3xl mb-2">🚚</div>
                  <h3 class="font-medium text-sm md:text-base mb-1">Fast Delivery</h3>
                  <p class="text-xs md:text-sm text-gray-600">2-5 business days</p>
                </div>
                <div class="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                  <div class="text-2xl md:text-3xl mb-2">🌱</div>
                  <h3 class="font-medium text-sm md:text-base mb-1">Care Guide</h3>
                  <p class="text-xs md:text-sm text-gray-600">Included free</p>
                </div>
                <div class="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                  <div class="text-2xl md:text-3xl mb-2">💚</div>
                  <h3 class="font-medium text-sm md:text-base mb-1">Guarantee</h3>
                  <p class="text-xs md:text-sm text-gray-600">30-day warranty</p>
                </div>
              </div>
            </div>
            
            <!-- Right Column: Details and Care Guide -->
            <div class="space-y-6 md:space-y-8">
              <!-- Product Details -->
              <div>
                <h1 class="text-3xl md:text-4xl font-bold mb-4">{{product.name}}</h1>
                <p class="text-gray-600 text-base md:text-lg mb-6">{{product.description}}</p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                    {{product.careLevel}} care
                  </span>
                  <span class="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                    {{product.lightRequirement}} light
                  </span>
                  <span class="px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-sm font-medium">
                    {{product.category}}
                  </span>
                </div>

                <!-- Desktop Add to Cart -->
                <div class="hidden lg:block mb-8">
                  <button 
                    (click)="addToCart()"
                    class="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold
                           hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    [disabled]="!product.inStock">
                    {{product.inStock ? 'Add to Cart' : 'Out of Stock'}}
                  </button>
                </div>
              </div>

              <!-- Care Guide -->
              <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <h2 class="text-xl md:text-2xl font-semibold mb-6">Care Guide</h2>
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <span class="text-2xl">💧</span>
                    <div>
                      <h3 class="font-medium mb-1">Watering</h3>
                      <p class="text-gray-600 text-sm md:text-base">
                        @switch (product.careLevel) {
                          @case ('easy') {
                            Water when the top inch of soil feels dry. Tolerates occasional missed waterings.
                          }
                          @case ('medium') {
                            Keep soil consistently moist but not waterlogged. Check soil moisture weekly.
                          }
                          @case ('advanced') {
                            Requires precise watering schedule. Monitor soil moisture carefully.
                          }
                        }
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <span class="text-2xl">☀️</span>
                    <div>
                      <h3 class="font-medium mb-1">Light</h3>
                      <p class="text-gray-600 text-sm md:text-base">
                        @switch (product.lightRequirement) {
                          @case ('low') {
                            Thrives in low light conditions. Avoid direct sunlight.
                          }
                          @case ('medium') {
                            Prefers bright, indirect light. Morning sun is ideal.
                          }
                          @case ('high') {
                            Needs plenty of bright light. Can handle direct morning sun.
                          }
                        }
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <span class="text-2xl">🌡️</span>
                    <div>
                      <h3 class="font-medium mb-1">Temperature</h3>
                      <p class="text-gray-600 text-sm md:text-base">
                        Maintains best growth between 65-80°F (18-27°C). Protect from cold drafts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="min-h-screen bg-background flex items-center justify-center">
          <div class="text-center px-4">
            <h2 class="text-2xl font-bold mb-4">Product Not Found</h2>
            <p class="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <a routerLink="/products" 
               class="inline-block bg-primary text-white px-6 py-3 rounded-lg 
                      hover:bg-secondary transition-colors">
              Browse Products
            </a>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product);
    }
  }
}