import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-care-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-background rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Care Guide</h2>
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <span class="text-2xl">💧</span>
          <div>
            <h3 class="font-medium mb-1">Watering</h3>
            <p class="text-gray-600">
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
            <p class="text-gray-600">
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
            <p class="text-gray-600">
              Maintains best growth between 65-80°F (18-27°C). Protect from cold drafts.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CareGuideComponent {
  @Input({ required: true }) product!: Product;
}