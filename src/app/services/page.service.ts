import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private currentPage: number = 1;

  constructor() {}

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }
}
