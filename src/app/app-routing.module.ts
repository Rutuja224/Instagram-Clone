import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  {'path':'','component':LoginComponent},
  {'path':'login','component':LoginComponent},
  {'path':'register','component':RegisterComponent},
  {'path':'dashboard/:userid','component':DashboardComponent,canActivate:[authGuard]},
  {'path':'profile/:userid','component':ProfileComponent,canActivate:[authGuard]},
  {'path':'friends/:userid','component':FriendsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
