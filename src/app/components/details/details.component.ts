import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  skin: any = null; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) this.fetchSkinDetails(id); 
  }

  
  async fetchSkinDetails(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/skins/${id}`);
      if (!response.ok) throw new Error(`Error fetching skin details: ${response.statusText}`);
      this.skin = await response.json(); 
    } catch (error) {
      console.error(error); 
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
