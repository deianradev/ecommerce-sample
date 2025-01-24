import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lg:sticky lg:top-20">
      <!-- Mobile Filter Button -->
      <button (click)="toggleFilters()"
              class="lg:hidden w-full bg-primary text-white px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
        <span class="font-medium">Filters</span>
        <span class="text-xl">{{ isOpen ? '×' : '↓' }}</span>
      </button>

      <!-- Filter Content -->
      <div [class.hidden]="!isOpen" class="lg:block">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-6">Filters</h3>
          
          <!-- Categories -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Categories</h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="category" 
                       [value]="''"
                       [(ngModel)]="selectedCategory"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">All Plants</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="category" 
                       value="indoor"
                       [(ngModel)]="selectedCategory"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Indoor Plants</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="category" 
                       value="outdoor"
                       [(ngModel)]="selectedCategory"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Outdoor Plants</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="category" 
                       value="succulent"
                       [(ngModel)]="selectedCategory"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Succulents</span>
              </label>
            </div>
          </div>

          <!-- Care Level -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Care Level</h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="careLevel" 
                       [value]="''"
                       [(ngModel)]="selectedCareLevel"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Any Level</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="careLevel" 
                       value="easy"
                       [(ngModel)]="selectedCareLevel"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Easy Care</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="careLevel" 
                       value="medium"
                       [(ngModel)]="selectedCareLevel"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Medium Care</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="careLevel" 
                       value="advanced"
                       [(ngModel)]="selectedCareLevel"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Advanced Care</span>
              </label>
            </div>
          </div>

          <!-- Light Requirement -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Light Requirement</h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="light" 
                       [value]="''"
                       [(ngModel)]="selectedLight"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Any Light</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="light" 
                       value="low"
                       [(ngModel)]="selectedLight"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Low Light</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="light" 
                       value="medium"
                       [(ngModel)]="selectedLight"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">Medium Light</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" 
                       name="light" 
                       value="high"
                       [(ngModel)]="selectedLight"
                       (ngModelChange)="onFilterChange()"
                       class="text-primary focus:ring-primary">
                <span class="text-gray-600 group-hover:text-primary transition-colors">High Light</span>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          @if (hasActiveFilters) {
            <button (click)="clearFilters()"
                    class="w-full bg-primary/10 text-primary hover:bg-primary/20 
                           px-4 py-2 rounded-lg transition-colors">
              Clear All Filters
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class ProductFiltersComponent {
  @Input() selectedCategory = '';
  @Input() selectedCareLevel = '';
  @Input() selectedLight = '';
  @Output() filterChange = new EventEmitter<{
    category: string;
    careLevel: string;
    light: string;
  }>();

  isOpen = false;

  get hasActiveFilters(): boolean {
    return this.selectedCategory !== '' || 
           this.selectedCareLevel !== '' || 
           this.selectedLight !== '';
  }

  toggleFilters() {
    this.isOpen = !this.isOpen;
  }

  onFilterChange() {
    this.filterChange.emit({
      category: this.selectedCategory,
      careLevel: this.selectedCareLevel,
      light: this.selectedLight
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedCareLevel = '';
    this.selectedLight = '';
    this.onFilterChange();
  }
}