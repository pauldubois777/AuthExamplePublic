import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
      <h3>This is the UNPROTECTED home view</h3>
      <br/><br/>
      <button class='btn btn-success' (click)='onSignIn()'>Existing User Sign In</button>
      <br/>
      <br/>
      <button class='btn btn-success' (click)='onSignUp()'>New User Sign Up</button>
    `
})
export class HomeComponent {

  constructor(private router: Router) {

  }

  onSignIn() {
    this.router.navigate(['/user/signin']);
  }

  onSignUp() {
    this.router.navigate(['/user/signup']);
  }
}
