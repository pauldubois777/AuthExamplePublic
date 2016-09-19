import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {
  private _isOpen = false;
  
  @HostBinding('class.open') get isOpen(){
    return this._isOpen
  }

  @HostListener('click') open() {
    this._isOpen = !this._isOpen;
  }

  @HostListener('mouseleave') close() {
    this._isOpen = false;
  }

}