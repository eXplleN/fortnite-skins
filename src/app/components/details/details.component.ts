import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';  

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  skin: any = null; 
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location: Location  
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = +params['page']; 
      }
    });

    this.route.params.subscribe(params => {
      const skinId = params['id'];  
      if (skinId) {
        this.fetchSkinDetails(skinId);  
      }
    });
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

  goBackToCatalog(): void {
    this.location.back();
  }
}
