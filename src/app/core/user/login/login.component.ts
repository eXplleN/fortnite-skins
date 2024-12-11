import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  login() {
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please correct the errors before submitting.';
      return;
    }

    const { email, password } = this.loginForm.value;

    
    this.userService.login(email, password).subscribe({
      next: (response: { token: string }) => {
        if (response.token) {
          this.userService.storeToken(response.token); 
          this.userService.setLoggedIn(true); 
          alert('Login successful!');
          this.router.navigate(['/profile']); 
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
}
