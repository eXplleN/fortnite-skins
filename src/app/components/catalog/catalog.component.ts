import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  skins: any[] = []; 

  ngOnInit() {
    this.fetchSkins(); 
  }

  
  async fetchSkins() {
    try {
      const response = await fetch('http://localhost:3000/api/skins');
      if (!response.ok) throw new Error(`Error fetching skins: ${response.statusText}`);
      this.skins = await response.json(); 
    } catch (error) {
      console.error(error); 
    }
  }

  async deleteSkin(id: string) {
    if (!confirm('Are you sure you want to delete this skin?')) return;
  
    try {
      const response = await fetch(`http://localhost:3000/api/skins/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete skin.');
  
      alert('Skin deleted successfully!');
      this.fetchSkins(); 
    } catch (error) {
      console.error(error);
      alert('Error deleting skin.');
    }
  }
  
  getRarityClass(rarity: string): string {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'common';
      case 'uncommon':
        return 'uncommon';
      case 'rare':
        return 'rare';
      case 'epic':
        return 'epic';
      case 'legendary':
        return 'legendary';
      default:
        return '';
    }
  }
}


