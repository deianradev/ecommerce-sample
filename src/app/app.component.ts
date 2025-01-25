import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { LoadingService } from './services/loading.service';
import { ViewportScroller, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PageLoaderComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-page-loader></app-page-loader>
      <app-header></app-header>
      <main class="flex-grow pt-16">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
        // Scroll to top on navigation start
        this.viewportScroller.scrollToPosition([0, 0]);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  }
}