import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LeagueListComponent } from './leagues/league-list/league-list.component';
import { LeagueCreateComponent } from './leagues/league-create/league-create.component';
import { LeagueDetailsComponent } from './leagues/league-details/league-details.component';
import { LeagueManComponent } from './leagues/league-man/league-man.component';
import { LeagueManagementComponent } from './leagues/league-management/league-management.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    LeagueListComponent,
    LeagueCreateComponent,
    LeagueDetailsComponent,
    LeagueManComponent,
    LeagueManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule { }
