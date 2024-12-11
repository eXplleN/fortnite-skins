import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageStateService } from '../../services/page.service';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  skins: any[] = [];
  displayedSkins: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pageStateService: PageStateService,
    public UserService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = +params['page'] || 1; 
      } 
      this.fetchSkins(); 
    });
  }
  
  fetchSkins(): void {
    fetch('http://localhost:3000/api/skins')
      .then((response) => response.json())
      .then((data) => {
        this.skins = data.map((skin: any) => ({
          ...skin,
          likes: skin.likes || [], 
          dislikes: skin.dislikes || [], 
        }));
        this.totalPages = Math.ceil(this.skins.length / this.itemsPerPage);
        this.loadPage(this.currentPage);
      })
      .catch((error) => {
        console.error('Error fetching skins:', error);
      });
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      console.error('Invalid page number');
      return;
    }

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.displayedSkins = this.skins.slice(startIndex, endIndex);

    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      console.error('Invalid page number');
      return;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });

    this.loadPage(page);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async deleteSkin(id: string) {
    if (!confirm('Are you sure you want to delete this skin?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/skins/${id}`, {
        method: 'DELETE',
      });

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

  likeSkin(skinId: string, skin: any): void {
    this.UserService.likeSkin(skinId).subscribe({
      next: (response) => {
        skin.likes.push(response.userId);
      },
      error: (error) => {
        console.error('Error liking skin:', error);
      }
    });
  }
  
  dislikeSkin(skinId: string, skin: any): void {
    this.UserService.dislikeSkin(skinId).subscribe({
      next: (response) => {
        skin.dislikes.push(response.userId);
      },
      error: (error) => {
        console.error('Error disliking skin:', error);
      }
    });
  }  
  
  goToDetails(skinId: string): void {
    this.pageStateService.setCurrentPage(this.currentPage);
    this.router.navigate(['/details', skinId]);
  }

  isLoggedIn(): boolean {
    return this.UserService.isUserLoggedIn();
  }
}
