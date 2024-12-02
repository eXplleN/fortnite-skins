import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false; 

  constructor(private router: Router) {
    this.checkLoginState(); 
  }

  
  checkLoginState() {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token; 
  }

  
  logout() {
    localStorage.removeItem('authToken'); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }
}

