import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor() {}

  register(user: { username: string; email: string; password: string }) {
    return fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        return data;
      });
  }

  login(credentials: { email: string; password: string }) {
    return fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then((response) => response.json());
  }

  logout() {
    return fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((response) => response.json());
  }
}
