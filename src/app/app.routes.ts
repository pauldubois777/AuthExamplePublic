import { RouterModule, Routes } from '@angular/router';

// Components
import { SigninComponent } from './unprotected/signin.component';
import { SignupComponent } from './unprotected/signup.component';
import { SignedOutComponent } from './unprotected/signed-out.component';
import { ProtectedComponent } from './protected/protected.component';
import { ProtectedHomeComponent } from './protected/protected-home.component';
import { Protected2Component } from './protected/protected2.component';
import { UserProfileComponent } from './protected/user-profile.component';
import { HomeComponent } from './unprotected/home.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';

// Guards
import { AuthGuardService } from './auth/auth-guard.service';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/signin', component: SigninComponent },
  { path: 'signedout', component: SignedOutComponent },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuardService] },
  { path: 'protectedHome', component: ProtectedHomeComponent, canActivate: [AuthGuardService] },
  { path: 'protected2', component: Protected2Component, canActivate: [AuthGuardService] },
  {path: '**', component: PageNotFoundComponent }
];

export const routes = RouterModule.forRoot(APP_ROUTES);
