import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/), 
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), 
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/), 
        ],
      ],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please correct the errors before submitting.';
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.userService.register(username, email, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.userService.setLoggedIn(true);
        alert('Registration successful!');
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed';
      },
    });
  }
}
