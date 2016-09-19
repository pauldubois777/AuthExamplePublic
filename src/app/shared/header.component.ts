import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { User } from './user';
import { AuthSignoutStatusEnum } from '../auth/auth-signout-status.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User = null;
  homeClass: string = "active";

  private currentUserSubscription: Subscription;
  private signoutStatusSubscription: Subscription;
  private routerEventSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
      this.currentUserSubscription = this.authService.currentUser.subscribe(
        // Need to run the following in the ngZone so that it will refresh the UI when the user refreshes the page
        // while logged in.
        (user: User) => this.ngZone.run( () => this.currentUser = user ) 
      );

      this.signoutStatusSubscription = this.authService.signOutStatus.subscribe(
        (signoutStatus: AuthSignoutStatusEnum) => {
          if (signoutStatus === AuthSignoutStatusEnum.SUCCESS){
              this.router.navigate(['/signedout']);
          }
          else{
            if (signoutStatus === AuthSignoutStatusEnum.FAILURE){
              alert("Sign Out FAILED!  Please try again"); // Shouldn't ever happen, so just pop an alert.
            }
          }
        }
      );

      // The following subscription is used to apply the "active" class the the "Home" menu item if either the
      // non-authenticate Home page is the current route, or the Protected Home page is the current route.
      // Might be easier to just have a single Home page.
      this.routerEventSubscription = this.router.events.subscribe(
        // Need to run the following in the ngZone so that it will refresh the UI when the user refreshes the page
        // while logged in.
        (event: Event) => this.ngZone.run( () => {
          if(event instanceof NavigationEnd) {
            if (event.url === "/home" || event.url === "/protectedHome"){
              this.homeClass = "active";
            }
            else{
              this.homeClass = "";
            }
          }
        })
      );
  }

  onSignOut(){
    this.authService.signoutUser();
  }
  
  ngOnDestroy(){
    this.currentUserSubscription.unsubscribe();
    this.signoutStatusSubscription.unsubscribe();
    this.routerEventSubscription.unsubscribe();
  }
}
