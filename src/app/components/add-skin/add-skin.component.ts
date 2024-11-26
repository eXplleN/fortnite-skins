import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-add-skin',
  templateUrl: './add-skin.component.html',
  styleUrls: ['./add-skin.component.css']
})
export class AddSkinComponent {
  skin = { name: '', image: '', rarity: '', description: '' };

  constructor(private router: Router) {}

  async addSkin() {
    try {
      const response = await fetch('http://localhost:3000/api/skins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.skin)
      });

      if (!response.ok) {
        throw new Error('Failed to create skin.');
      }

      alert('Skin added successfully!');
      this.router.navigate(['/catalog']);
    } catch (error) {
      console.error(error);
      alert('Error adding skin.');
    }
  }
}
