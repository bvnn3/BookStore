import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddWriterComponent } from './components/add-writer/add-writer.component';
import { CartComponent } from './components/cart/cart.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'addWriter', component: AddWriterComponent},
  {path: 'homePage', component: HomePageComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'book/:id', component: BookDetailsComponent },
  {path: 'cart', component: CartComponent },

  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: '**', redirectTo: '/homePage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


