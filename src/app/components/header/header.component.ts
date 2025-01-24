import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div class="container mx-auto px-4">
        <nav class="flex justify-between items-center h-16">
          <!-- Logo -->
          <a routerLink="/" 
             class="text-xl md:text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span class="text-3xl md:text-4xl">🌿</span>
            <span class="font-serif tracking-wide hidden sm:inline">Greenery</span>
          </a>
          
          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2" (click)="toggleMenu()">
            @if (isMenuOpen) {
              <span class="text-2xl">×</span>
            } @else {
              <span class="text-xl">☰</span>
            }
          </button>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a routerLink="/products" 
               class="relative group"
               (click)="showLoading()">
              <span class="text-white/90 group-hover:text-white transition-colors">
                Shop Plants
              </span>
              <span class="absolute inset-x-0 bottom-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            
            <a routerLink="/cart" 
               class="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 
                      px-4 py-2 rounded-full transition-colors">
              <span>Cart</span>
              @if (cartItemCount > 0) {
                <span class="bg-accent text-primary text-sm px-2 py-0.5 rounded-full font-medium min-w-[1.5rem] text-center">
                  {{ cartItemCount }}
                </span>
              }
            </a>
          </div>
        </nav>

        <!-- Mobile Menu -->
        @if (isMenuOpen) {
          <div class="md:hidden absolute left-0 right-0 top-16 bg-primary shadow-lg animate-slideDown">
            <div class="p-4 space-y-4">
              <a routerLink="/products" 
                 class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                 (click)="closeMenu(); showLoading()">
                Shop Plants
              </a>
              <a routerLink="/cart" 
                 class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                 (click)="closeMenu()">
                Cart
                @if (cartItemCount > 0) {
                  <span class="ml-2 bg-accent text-primary text-sm px-2 py-0.5 rounded-full font-medium">
                    {{ cartItemCount }}
                  </span>
                }
              </a>
            </div>
          </div>
        }
      </div>
    </header>
  `,
  styles: [`
    .animate-slideDown {
      animation: slideDown 0.2s ease-out forwards;
    }
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    private cartService: CartService,
    private loadingService: LoadingService
  ) {}

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768) {
      this.isMenuOpen = false;
    }
  }

  get cartItemCount(): number {
    return this.cartService.getCartCount();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  showLoading() {
    this.loadingService.show();
  }
}