import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DetailsComponent } from './components/details/details.component';
import { AddSkinComponent } from './components/add-skin/add-skin.component';
import { EditSkinComponent } from './components/edit-skin/edit-skin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'add', component: AddSkinComponent },
  { path: 'edit/:id', component: EditSkinComponent },
  { path: '**', redirectTo: 'catalog' }
];

