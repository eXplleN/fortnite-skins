import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private tokenKey = 'token'; 

  constructor() {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      return decodedToken.userId; 
    }
    return null;
  }
}
