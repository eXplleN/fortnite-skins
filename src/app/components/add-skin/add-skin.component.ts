import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-add-skin',
  templateUrl: './add-skin.component.html',
  styleUrls: ['./add-skin.component.css'],
})
export class AddSkinComponent {
  skinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group with validators
    this.skinForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name: required, min 3 chars
      image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]], // Image: valid URL
      rarity: ['', Validators.required], // Rarity: required
      description: ['', [Validators.required, Validators.minLength(10)]], // Description: min 10 chars
    });
  }

  async createSkin() {
    if (this.skinForm.invalid) {
      alert('Please correct the errors in the form before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const skinData = this.skinForm.value;

      const response = await fetch('http://localhost:3000/api/skins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(skinData),
      });

      if (!response.ok) {
        throw new Error('Failed to create skin. Please check the form and try again.');
      }

      alert('Skin added successfully!');
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error creating skin:', error);
      alert('Error creating skin. Please try again.');
    }
  }
}
