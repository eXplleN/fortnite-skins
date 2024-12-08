import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkinsService {
  private apiUrl = 'http://localhost:3000/api/skins';

  constructor(private http: HttpClient) {}

  getSkins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSkinById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
}
