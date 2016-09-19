import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    template: `
      <h3>This is the PROTECTED Home view</h3>
      <h4>Only authenticated users can see it.</h4>
    `
})
export class ProtectedHomeComponent {
  constructor(private authService: AuthService) {

  }
  onSignOut() {
    this.authService.signoutUser();
  }
}
