import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { featuredIndoorPlants, featuredOutdoorPlants, featuredSucculents } from '../data/featured-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    ...featuredIndoorPlants,
    ...featuredOutdoorPlants,
    ...featuredSucculents,
    {
      id: 12,
      name: "Snake Plant",
      description: "One of the most tolerant houseplants, perfect for beginners and busy plant parents.",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1616961162823-aeba510620c6?q=80&w=3992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "indoor",
      careLevel: "easy",
      lightRequirement: "low",
      inStock: true
    },
    {
      id: 13,
      name: "Bird of Paradise",
      description: "Dramatic tropical plant with large, banana-like leaves.",
      price: 79.99,
      imageUrl: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixlib=rb-4.0.3",
      category: "indoor",
      careLevel: "medium",
      lightRequirement: "high",
      inStock: true
    },
    {
      id: 14,
      name: "Boston Fern",
      description: "Classic hanging plant with delicate, arching fronds.",
      price: 32.99,
      imageUrl: "https://images.unsplash.com/photo-1495758874721-e9da827a0581?q=80&w=4898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "indoor",
      careLevel: "medium",
      lightRequirement: "medium",
      inStock: true
    },
    {
      id: 15,
      name: "Rose Bush",
      description: "Classic garden rose with fragrant blooms.",
      price: 44.99,
      imageUrl: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-4.0.3",
      category: "outdoor",
      careLevel: "medium",
      lightRequirement: "high",
      inStock: true
    },
    {
      id: 16,
      name: "Bamboo",
      description: "Fast-growing, elegant screening plant.",
      price: 54.99,
      imageUrl: "https://plus.unsplash.com/premium_photo-1694864661950-288ec8a06e5c?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "outdoor",
      careLevel: "easy",
      lightRequirement: "medium",
      inStock: true
    },
    {
      id: 17,
      name: "Aloe Vera",
      description: "Medicinal succulent with thick, healing leaves.",
      price: 18.99,
      imageUrl: "https://images.unsplash.com/photo-1613372978247-de50228e8033?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "succulent",
      careLevel: "easy",
      lightRequirement: "high",
      inStock: true
    },
    {
      id: 18,
      name: "Burro's Tail",
      description: "Trailing succulent with rope-like stems.",
      price: 22.99,
      imageUrl: "https://images.unsplash.com/photo-1711690161380-5e0ca506e678?q=80&w=3997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "succulent",
      careLevel: "easy",
      lightRequirement: "medium",
      inStock: true
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }
}