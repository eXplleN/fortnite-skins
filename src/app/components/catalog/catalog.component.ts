import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkinService } from '../../services/skin.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  skins: any[] = []; 

  constructor(private skinService: SkinService) {}

  ngOnInit(): void {
    this.getSkins();
  }

  getSkins(): void {
    this.skinService.getAllSkins().subscribe({
      next: (data) => (this.skins = data),
      error: (err) => console.error('Error fetching skins:', err),
    });
  }
}

