import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {
    
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }

  logout() {
    this.userService.logout(); 
    this.router.navigate(['/']); 
  }
}

