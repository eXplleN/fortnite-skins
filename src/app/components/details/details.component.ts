import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from '../../services/wishlist.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  skin: any = null; 
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private wishlistService: WishlistService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const skinId = params['id'];
      if (skinId) {
        this.fetchSkinDetails(skinId);
      }
    });

    this.isAuthenticated = this.userService.isUserLoggedIn();
  }

  async fetchSkinDetails(id: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`http://localhost:3000/api/skins/${id}`)
      );
      this.skin = response; 
    } catch (error) {
      console.error('Error fetching skin details:', error);
      alert('Failed to load skin details.');
    }
  }

  addToWishlist(): void {
    if (!this.skin) {
      alert('Skin details are not available.');
      return;
    }
  
    if (!this.isAuthenticated) {
      alert('You must be logged in to add skins to your wishlist.');
      return;
    }
  
    const userId = this.userService.getUserId();
  
    if (!userId) {
      alert('Please log in to add skins to your wishlist.');
      return;
    }
  
    this.wishlistService.addToWishlist(userId, this.skin._id).subscribe({
      next: () => {
        alert('Skin added to your wishlist!');
      },
      error: (error) => {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add skin to wishlist. Please try again later.');
      },
    });
  }  

  goBackToCatalog(): void {
    this.location.back();
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
