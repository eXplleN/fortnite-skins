import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AddSkinComponent } from './components/add-skin/add-skin.component';
import { EditSkinComponent } from './components/edit-skin/edit-skin.component';
import { DetailsComponent } from './components/details/details.component';
import { RegisterComponent } from './core/user/register/register.component';
import { LoginComponent } from './core/user/login/login.component';
import { MyProfileComponent } from './core/user/my-profile/my-profile.component';
import { authGuard } from './guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'add', component: AddSkinComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditSkinComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: MyProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];

