import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Skin {
  _id: string;
  name: string;
  image: string;
  rarity: string;
  like: [];
  dislike: [];
  description: string;
  creator: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; 
  private tokenKey = 'token'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.setLoggedIn(this.isUserLoggedIn()); 
  }

  register(username: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/register`, {
      username,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return new Observable((observer) => {
      this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, { email, password }).subscribe(
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
    alert('Logout successful!');
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

  getUserId(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      return decodedToken.userId;  
    }
    return null;
  }

  getProtectedData() {
    const token = this.getToken();
    if (token) {
      return fetch(`${this.apiUrl}/users/protected`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    }
    return Promise.reject('No token found');
  }

  getUserSkins(): Observable<Skin[]> {
    return this.http.get<Skin[]>(`${this.apiUrl}/skins`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllSkins(filterByCreator: boolean = false): Observable<Skin[]> {
    const apiUrl = `${this.apiUrl}/skins`;
    const headers = this.getAuthHeaders();
  
    if (filterByCreator) {
      const token = this.getToken();
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));  
        const userId = decodedToken.userId;  
        return this.http.get<Skin[]>(`${apiUrl}?creator=${userId}`, { headers });
      }
    }
  
    return this.http.get<Skin[]>(apiUrl, { headers });
  }
  
  deleteSkin(skinId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skins/${skinId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getWishlist(): Observable<any> {
    const userId = this.getUserId(); 
    if (userId) {
      return this.http.get(`/wishlist/${userId}`); 
    }
    throw new Error('User not logged in');
  }

  addToWishlist(skinId: string): Observable<any> {
    const userId = this.getUserId(); 
    if (userId) {
      return this.http.post(`/wishlist/${userId}`, { skinId });
    }
    throw new Error('User not logged in');
  }

  
  removeFromWishlist(skinId: string): Observable<any> {
    const userId = this.getUserId(); 
    if (userId) {
      return this.http.delete(`/wishlist/${userId}/${skinId}`);
    }
    throw new Error('User not logged in');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  likeSkin(skinId: string) {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${this.apiUrl}/skins/${skinId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
  dislikeSkin(skinId: string) {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${this.apiUrl}/skins/${skinId}/dislike`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
  getLikesDislikes(skinId: string): Observable<any> {
    return this.http.get(`/skins/${skinId}/like`, { headers: this.getAuthHeaders() });
  }
  
}
