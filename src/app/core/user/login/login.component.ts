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
    this.userService
      .login({ email: this.email, password: this.password })
      .then((response) => {
        if (response.token) {
          alert('Login successful!');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message;
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      });
  }
}
