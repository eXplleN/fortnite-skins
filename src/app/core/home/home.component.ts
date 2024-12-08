import { Component, OnInit } from '@angular/core';
import { SkinsService } from '../../services/skins.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredSkins: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private skinsService: SkinsService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadFeaturedSkins();
    this.userService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })  
  }

  loadFeaturedSkins() {
    this.skinsService.getSkins().subscribe((skins) => {
      this.featuredSkins = skins.slice(0, 5); 
    });
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
