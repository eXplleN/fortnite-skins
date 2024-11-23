import { Routes } from '@angular/router';
import { EditSkinComponent } from './components/edit-skin/edit-skin.component';
import { AddSkinComponent } from './components/add-skin/add-skin.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { DetailsComponent } from './components/details/details.component';
import { CatalogComponent } from './components/catalog/catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'catalog', component: CatalogComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'my-collection', component: MyCollectionComponent },
    { path: 'add-skin', component: AddSkinComponent },
    { path: 'edit-skin/:id', component: EditSkinComponent },
    { path: '**', redirectTo: 'catalog' }
];
