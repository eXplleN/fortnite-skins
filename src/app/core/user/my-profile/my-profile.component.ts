import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  userSkins: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserSkins();
  }

  loadUserSkins(): void {
    this.userService.getUserSkins()
      .then((skins) => {
        this.userSkins = skins;
      })
      .catch((error) => {
        console.error('Error loading user skins:', error);
        this.errorMessage = 'Failed to load skins. Please try again later.';
      });
  }

  deleteSkin(skinId: string): void {
    this.userService.deleteSkin(skinId)
      .then(() => {
        this.userSkins = this.userSkins.filter((skin) => skin._id !== skinId);
        alert('Skin deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting skin:', error);
        this.errorMessage = 'Failed to delete skin.';
      });
  }
}
