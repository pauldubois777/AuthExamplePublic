import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <h3>Protected 2 - only authenticated users can see this</h3>
  `,
  styles: []
})
export class Protected2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}