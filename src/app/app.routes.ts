import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SkinDetailsComponent } from './components/skin-details/skin-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'details/:id', component: SkinDetailsComponent },
];
