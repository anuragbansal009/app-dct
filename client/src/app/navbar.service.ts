import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {

  visible: boolean
  showCal: boolean = false
  calIcon: boolean = false;
  
  constructor() {
    this.visible = true
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }

  showCalIcon() {
    this.calIcon = true;
  }

}