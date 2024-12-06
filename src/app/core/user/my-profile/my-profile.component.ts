import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

interface Skin {
  _id: string;
  name: string;
  image: string;
  rarity: string;
  description: string;
  creator: string;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  userSkins: Skin[] = [];
  allSkins: Skin[] = [];
  errorMessage: string = '';
  successMessage: string = '';

 
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserSkins();
  }

  loadUserSkins(): void {
    this.userService.getAllSkins().subscribe({
      next: (skins: Skin[]) => {
        this.allSkins = skins;
        this.filterUserSkins();
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading skins:', error);
        this.errorMessage = 'Failed to load skins. Please try again later.';
      },
    });
  }

  filterUserSkins(): void {
    const userId = this.getLoggedInUserId();
    if (userId) {
      this.userSkins = this.allSkins.filter((skin) => skin.creator === userId);
    }
  }

  getLoggedInUserId(): string | null {
    const token = this.userService.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.userId;
    }
    return null;
  }

  deleteSkin(skinId: string): void {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this skin?'
    );
    if (confirmDelete) {
      this.userService.deleteSkin(skinId).subscribe({
        next: () => {
          this.userSkins = this.userSkins.filter((skin) => skin._id !== skinId);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete skin.';
        },
      });
    }
  }

  editSkin(skinId: string): void {
    this.router.navigate(['edit', skinId]); 
  }

  viewDetails(skinId: string): void {
    this.router.navigate(['details', skinId]);
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
