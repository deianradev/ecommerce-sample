import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { TestimonialCardComponent } from '../../components/testimonial-card/testimonial-card.component';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { featuredIndoorPlants, featuredOutdoorPlants, featuredSucculents } from '../../data/featured-products';
import { Product } from '../../models/product.model';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    ProductCardComponent, 
    TestimonialCardComponent
  ],
  template: `
    <!-- Hero Section -->
    <div class="relative min-h-screen bg-cover bg-center flex items-center -mt-16" 
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/images/products/cover.jpg')">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      <div class="relative container mx-auto px-4">
        <div class="max-w-3xl text-white">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Space with Nature's Beauty
          </h1>
          <p class="text-lg md:text-xl mb-8 leading-relaxed">
            Discover our carefully curated collection of premium plants, designed to bring life, 
            color, and tranquility to your home.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a routerLink="/products" 
               class="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg 
                      text-lg font-semibold transition-colors text-center">
              Shop Now
            </a>
            <button (click)="scrollToCollections()"
                    class="border-2 border-white hover:bg-white hover:text-primary 
                           px-8 py-4 rounded-lg text-lg font-semibold transition-all text-center">
              View Collection
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="py-20 bg-background" #collections>
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4">Our Collections</h2>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Explore our diverse range of plants, each carefully selected to bring unique character 
          and vitality to your living spaces.
        </p>

        <!-- Indoor Plants -->
        <div class="mb-20">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold">Indoor Plants</h3>
            <a [routerLink]="['/products']" [queryParams]="{category: 'indoor'}"
               class="text-primary hover:text-secondary transition-colors font-medium">
              View All Indoor Plants →
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (product of indoorPlants; track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        </div>

        <!-- Outdoor Plants -->
        <div class="mb-20">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold">Outdoor Plants</h3>
            <a [routerLink]="['/products']" [queryParams]="{category: 'outdoor'}"
               class="text-primary hover:text-secondary transition-colors font-medium">
              View All Outdoor Plants →
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (product of outdoorPlants; track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        </div>

        <!-- Succulents -->
        <div class="mb-20">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold">Succulents</h3>
            <a [routerLink]="['/products']" [queryParams]="{category: 'succulent'}"
               class="text-primary hover:text-secondary transition-colors font-medium">
              View All Succulents →
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (product of succulents; track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="bg-white py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Join our community of happy plant parents and transform your space with our premium plants.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of testimonials; track testimonial.name) {
            <app-testimonial-card [testimonial]="testimonial" />
          }
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-background py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="text-5xl mb-6">🌱</div>
            <h3 class="text-xl font-semibold mb-3">Expert Plant Care</h3>
            <p class="text-gray-600">
              Every plant comes with detailed care instructions and lifetime support from our plant experts.
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-6">🚚</div>
            <h3 class="text-xl font-semibold mb-3">Safe Delivery</h3>
            <p class="text-gray-600">
              Plants are carefully packaged and shipped in temperature-controlled boxes.
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-6">💚</div>
            <h3 class="text-xl font-semibold mb-3">30-Day Guarantee</h3>
            <p class="text-gray-600">
              If your plant arrives damaged or dies within 30 days, we'll replace it for free.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  @ViewChild('collections') collectionsSection!: ElementRef;
  
  allIndoorPlants: Product[] = featuredIndoorPlants;
  allOutdoorPlants: Product[] = featuredOutdoorPlants;
  allSucculents: Product[] = featuredSucculents;

  get indoorPlants(): Product[] {
    return this.paginationService.paginateItems(this.allIndoorPlants);
  }

  get outdoorPlants(): Product[] {
    return this.paginationService.paginateItems(this.allOutdoorPlants);
  }

  get succulents(): Product[] {
    return this.paginationService.paginateItems(this.allSucculents);
  }

  get hasMoreIndoor(): boolean {
    return this.paginationService.hasMoreItems(this.allIndoorPlants);
  }

  get hasMoreOutdoor(): boolean {
    return this.paginationService.hasMoreItems(this.allOutdoorPlants);
  }

  get hasMoreSucculents(): boolean {
    return this.paginationService.hasMoreItems(this.allSucculents);
  }

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Plant Enthusiast',
      content: 'The quality of plants from Greenery is exceptional. My Monstera is thriving and the care instructions were incredibly helpful.',
      image: 'assets/images/products/monstera-deliciosa.jpg',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Interior Designer',
      content: 'I regularly source plants from Greenery for my clients. Their selection and customer service are unmatched.',
      image: 'assets/images/products/fiddle-leaf-fig.jpg',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Home Gardener',
      content: 'The plants arrive in perfect condition and the ongoing support has helped me develop my green thumb.',
      image: 'assets/images/products/peace-lily.jpg',
      rating: 5
    }
  ];

  constructor(private paginationService: PaginationService) {}

  scrollToCollections() {
    this.collectionsSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  onScroll() {
    this.paginationService.loadMore();
  }
}