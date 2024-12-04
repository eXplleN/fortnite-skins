import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private tokenKey = 'token'; 

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.setLoggedIn(this.isUserLoggedIn()); 
  }
  

  register(username: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return new Observable((observer) => {
      this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).subscribe(
        (response) => {
          const token = response.token;
          this.storeToken(token); 
          this.setLoggedIn(true); 
          observer.next(response);
        },
        (error) => observer.error(error)
      );
    });
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setLoggedIn(false);
  }

  setLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getProtectedData() {
    const token = this.getToken();
    if (token) {
      return fetch(`${this.apiUrl}/protected`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    }
    return Promise.reject('No token found');
  }

  getUserSkins() {
    const token = this.getToken();
    if (token) {
      return fetch(`${this.apiUrl}/my-skins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    }
    return Promise.reject('No token found');
  }

  deleteSkin(skinId: string) {
    const token = this.getToken();
    if (token) {
      return fetch(`${this.apiUrl}/skins/${skinId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    }
    return Promise.reject('No token found');
  }
}
