import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { UserAuthService } from '../../services/user-auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private authService: UserAuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      alert('You need to log in to view your wishlist.');
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.getUserId();
  
    if (!userId) {
      alert('User ID not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
  
    this.wishlistService.getWishlist(userId).pipe(
      tap((data: any) => {
        if (data && data.skins) {
          this.wishlist = data.skins; 
        } else {
          alert('No skins found in wishlist.');
        }
      }),
      catchError((error) => {
        console.error('Error fetching wishlist:', error);
        alert('Failed to load wishlist');
        return of([]); 
      })
    ).subscribe();
  }

  viewDetails(skinId: string): void {
    this.router.navigate([`/skin-details/${skinId}`]); 
  }

  removeFromWishlist(skinId: string): void {
    const userId = this.authService.getUserId();
  
    if (!userId) {
      alert('User not logged in. Please log in to remove items from wishlist.');
      this.router.navigate(['/login']);
      return;
    }
  
    this.wishlistService.removeFromWishlist(userId, skinId).pipe(
      tap(() => {
        this.wishlist = this.wishlist.filter(skin => skin._id !== skinId); 
        alert('Skin removed from wishlist!');
      }),
      catchError((error) => {
        console.error('Error removing skin from wishlist:', error);
        alert('Failed to remove skin from wishlist');
        return of(null); 
      })
    ).subscribe(); 
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
