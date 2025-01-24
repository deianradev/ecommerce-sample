import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private pageSize = 6;
  private currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();

  paginateItems<T>(items: T[]): T[] {
    const currentPageValue = this.currentPage.getValue();
    return items.slice(0, currentPageValue * this.pageSize);
  }

  loadMore() {
    this.currentPage.next(this.currentPage.getValue() + 1);
  }

  reset() {
    this.currentPage.next(1);
  }

  hasMoreItems<T>(items: T[]): boolean {
    return this.currentPage.getValue() * this.pageSize < items.length;
  }
}