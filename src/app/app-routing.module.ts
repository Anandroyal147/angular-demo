import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_services/auth.guard';
import { OrganizationFormComponent } from './organization/organization-form/organization-form.component';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { 
    path: 'organization', 
    children: [
      { path: 'create', component: OrganizationFormComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: OrganizationFormComponent, canActivate: [AuthGuard] },
      { path: 'view/:id', component: OrganizationFormComponent, canActivate: [AuthGuard] },
      { path: 'list', component: OrganizationListComponent, canActivate: [AuthGuard] }
    ],
    component: OrganizationComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'user', 
    children: [
      { path: 'create', component: UsersFormComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: UsersFormComponent, canActivate: [AuthGuard] },
      { path: 'view/:id', component: UsersFormComponent, canActivate: [AuthGuard] },
      { path: 'list', component: UsersListComponent, canActivate: [AuthGuard] }
    ],
    component: UsersComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'user/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
