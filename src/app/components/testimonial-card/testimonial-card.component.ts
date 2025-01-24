import { Component, Input } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div class="flex items-center gap-4 mb-4">
        <img [src]="testimonial.image" 
             [alt]="testimonial.name"
             class="w-16 h-16 rounded-full object-cover">
        <div>
          <h3 class="font-semibold">{{ testimonial.name }}</h3>
          <p class="text-gray-600 text-sm">{{ testimonial.role }}</p>
        </div>
      </div>
      <div class="flex gap-1 mb-4">
        @for (star of [1,2,3,4,5]; track star) {
          <span class="text-accent">★</span>
        }
      </div>
      <p class="text-gray-700 italic flex-grow">
        "{{ testimonial.content }}"
      </p>
    </div>
  `
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;
}