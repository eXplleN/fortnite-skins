import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.errorMessage = ''; 
  
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.userService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        if (response.token) {
          this.userService.storeToken(response.token); 
          this.userService.setLoggedIn(true); 
          alert('Login successful!');
          
          this.email = ''; 
          this.password = '';
          
          this.router.navigate(['/profile']); 
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
