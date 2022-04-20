import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LeagueCreateComponent } from './leagues/league-create/league-create.component';
import { LeagueDetailsComponent } from './leagues/league-details/league-details.component';
import { LeagueListComponent } from './leagues/league-list/league-list.component';
import { LeagueManComponent } from './leagues/league-man/league-man.component';
import { LeagueManagementComponent } from './leagues/league-management/league-management.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
           {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'create-league',
        component: LeagueCreateComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'edit-league/:leagueId',
        component: LeagueCreateComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'leagues',
        component: LeagueListComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'leagues-management',
        component: LeagueManComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'league-detail/:id',
        component: LeagueDetailsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'leagues-management/:id',
        component: LeagueManagementComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'users/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'user-edit/:id',
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'profile/:id',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },

      // {
      //   path: 'matches',
      //   component: MatchesListComponent,
      //   canActivate: [AuthGuard],
      // },

      // {
      //   path: 'editMatch/:id',
      //   component: MatchEditComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'matchDetails/:id',
      //   component: MatchDetailComponent,
      //   canActivate: [AuthGuard],
      // },

      // {
      //   path: 'table',
      //   component: TableRowComponent,
      //   canActivate: [AuthGuard],
      // },

      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
