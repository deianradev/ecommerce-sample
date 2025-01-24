import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="relative w-20 h-20">
        <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-3xl">🌱</span>
        </div>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {}