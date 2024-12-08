import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';  

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  getWishlist(userId: string): Observable<any> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${userId}/skins`, { headers });
  }

  addToWishlist(userId: string, skinId: string): Observable<any> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.apiUrl}/${userId}/skins`, { skinId }, { headers });
  }

  removeFromWishlist(userId: string, skinId: string): Observable<any> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.apiUrl}/${userId}/skins/${skinId}`, { headers });
  }
}
