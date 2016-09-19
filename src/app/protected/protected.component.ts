import { Component } from '@angular/core';

@Component({
  template: `
    <h3>Protected - only authenticated users can see this</h3>
  `,
  styles: []
})
export class ProtectedComponent {
}
