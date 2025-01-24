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
  templateUrl: './home.component.html',
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