import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { Product } from '../../models/product.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, ProductFiltersComponent, LoadingSpinnerComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Back Navigation -->
      <nav class="mb-8">
        <a routerLink="/" 
           class="text-primary hover:text-secondary transition-colors flex items-center gap-2">
          <span>←</span>
          <span>Back to Home</span>
        </a>
      </nav>

      <!-- Page Title -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold">Our Plants</h1>
      </div>

      @if (loading) {
        <app-loading-spinner />
      } @else {
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <!-- Filters -->
          <div class="lg:col-span-3 mb-6 lg:mb-0">
            <app-product-filters
              [selectedCategory]="selectedCategory"
              [selectedCareLevel]="selectedCareLevel"
              [selectedLight]="selectedLight"
              (filterChange)="onFilterChange($event)"
            />
          </div>

          <!-- Products Grid -->
          <div class="lg:col-span-9">
            @if (isFiltering) {
              <div class="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative w-12 h-12">
                    <div class="absolute inset-0 border-3 border-primary/20 rounded-full"></div>
                    <div class="absolute inset-0 border-3 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <div class="text-center">
                    <p class="text-primary font-medium">Filtering plants...</p>
                    <p class="text-gray-600 text-sm">Finding your perfect match</p>
                  </div>
                </div>
              </div>
            }
            
            @if (filteredProducts.length === 0) {
              <div class="bg-white rounded-xl p-6 text-center">
                <h2 class="text-xl font-semibold mb-2">No Plants Found</h2>
                <p class="text-gray-600 mb-4">
                  We couldn't find any plants matching your selected filters.
                </p>
                <button (click)="clearFilters()"
                        class="bg-primary text-white px-6 py-3 rounded-lg 
                               hover:bg-secondary transition-colors">
                  Clear Filters
                </button>
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                @for (product of filteredProducts; track product.id) {
                  <app-product-card [product]="product" />
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = '';
  selectedCareLevel = '';
  selectedLight = '';
  loading = true;
  isFiltering = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      
      // Get filter from query params
      const params = this.route.snapshot.queryParams;
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterProducts();
      } else {
        this.filteredProducts = products;
      }
      
      this.loading = false;
    });
  }

  onFilterChange(filters: { category: string; careLevel: string; light: string }) {
    this.selectedCategory = filters.category;
    this.selectedCareLevel = filters.careLevel;
    this.selectedLight = filters.light;
    this.isFiltering = true;
    
    setTimeout(() => {
      this.filterProducts();
      this.isFiltering = false;
    }, 300);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesCareLevel = !this.selectedCareLevel || product.careLevel === this.selectedCareLevel;
      const matchesLight = !this.selectedLight || product.lightRequirement === this.selectedLight;
      return matchesCategory && matchesCareLevel && matchesLight;
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedCareLevel = '';
    this.selectedLight = '';
    this.filterProducts();
  }
}