import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { User } from '../shared/user';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  private currentUser: User = null;
  private currentUserSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(
        (user: User) => { this.currentUser = user; }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.currentUser != null) {
      if (state.url === '/home') {
        // Give the signed-in user the protected home page
        this.router.navigate(['/protectedHome']);
      }
      return true;
    } else {
      if (state.url === '/home') {
        // Allow un-authenticated user to see the unprotected home page
        return true;
      } else {
        this.router.navigate(['/user/signin'], {queryParams: {'redirectUrl': state.url}});
        return false;
      }
    }
  }
}
