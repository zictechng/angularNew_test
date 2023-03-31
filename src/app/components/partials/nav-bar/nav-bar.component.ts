import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
declare var jQuery:any;
declare const require: any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit {

  // this make the toggle of menu and nav-bar to work
  // we are calling the jquery that hold the script after the page is loaded
  // so that angular application can have access to the javascript.
  //../assets/js/main.js
  ngAfterViewInit() {
    require('../../../../assets/vendor/js/helpers.js');
    require('../../../../assets/js/main.js');
  }
}
