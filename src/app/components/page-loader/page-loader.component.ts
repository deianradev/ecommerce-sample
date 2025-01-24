import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading$ | async) {
      <div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-6">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-3xl">🌱</span>
          </div>
        </div>
        <div class="text-center">
          <p class="text-primary text-xl font-medium mb-2">Loading...</p>
          <p class="text-gray-600">Growing something beautiful for you</p>
        </div>
      </div>
    }
  `
})
export class PageLoaderComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}
}