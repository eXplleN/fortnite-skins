import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        
        localStorage.setItem('token', response.token);

      
        this.userService.setLoggedIn(true);

        
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed';
      },
    });
  }
}
