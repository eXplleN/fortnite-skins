import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-edit-skin',
  templateUrl: './edit-skin.component.html',
  styleUrls: ['./edit-skin.component.css']
})
export class EditSkinComponent implements OnInit {
  skin: any = { name: '', image: '', rarity: '', description: '' };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchSkin(id);
    }
  }

  async fetchSkin(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/skins/${id}`);
      if (!response.ok) throw new Error('Failed to fetch skin.');
      this.skin = await response.json();
    } catch (error) {
      console.error(error);
      alert('Error fetching skin details.');
    }
  }

  async updateSkin() {
    try {
      const response = await fetch(`http://localhost:3000/api/skins/${this.skin._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.skin)
      });

      if (!response.ok) throw new Error('Failed to update skin.');
      alert('Skin updated successfully!');
      this.router.navigate(['/catalog']);
    } catch (error) {
      console.error(error);
      alert('Error updating skin.');
    }
  }
}