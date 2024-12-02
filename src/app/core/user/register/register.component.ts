import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService
      .register({ username: this.username, email: this.email, password: this.password })
      .then((response) => {
        console.log('Response from backend:', response); 
        if (response.token) {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.message; 
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error); 
        this.errorMessage = 'Something went wrong. Please try again.';
      });
  }
}
