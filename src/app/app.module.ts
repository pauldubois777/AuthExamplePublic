import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes'; 

import { AppComponent } from './app.component';
import { SigninComponent } from './unprotected/signin.component';
import { SignupComponent } from './unprotected/signup.component';
import { HomeComponent } from './unprotected/home.component';
import { SignedOutComponent } from './unprotected/signed-out.component';
import { ProtectedComponent } from './protected/protected.component';
import { ProtectedHomeComponent } from './protected/protected-home.component';
import { Protected2Component } from './protected/protected2.component';
import { UserProfileComponent } from './protected/user-profile.component';
import { HeaderComponent } from './shared/header.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { DropdownDirective } from './shared/dropdown.directive';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthBackendFirebaseService } from './auth/auth-backend-firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProtectedComponent,
    Protected2Component,
    ProtectedHomeComponent,
    HeaderComponent,
    DropdownDirective,
    UserProfileComponent,
    PageNotFoundComponent,
    SignedOutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    routes
  ],
  providers: [
    AuthService,
    AuthBackendFirebaseService,
    AuthGuardService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

