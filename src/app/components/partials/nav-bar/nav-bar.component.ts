import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';
declare var $: any;
declare var jQuery:any;
declare const require: any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit, OnInit{

  isFormSubmit = false;
  defaultImageProfile: string = '';
  defaultDetailsLocalStorage: any;
  top_bar_fullname: any = '';
  userDatas: any;
  userProfilePhoto = '';
  userProfilePic = '';

  constructor(private _dataService: ServiceDataService,
   private _authService: AuthServiceService,
   public _authLevel: userLevelAccess,
   private _router: Router){}

  // this make the toggle of menu and nav-bar to work
  // we are calling the jquery that hold the script after the page is loaded
  // so that angular application can have access to the javascript.
  //../assets/js/main.js
  ngAfterViewInit() {
    require('../../../../assets/vendor/js/helpers.js');
    require('../../../../assets/js/main.js');
  }

  ngOnInit(): void {
    this.defaultImageProfile = this._dataService.getDefaultImage();
    this.defaultDetailsLocalStorage = this._dataService.getUserLocalInfomation();
    this._authLevel.myAccessLevel();
    this.top_bar_fullname = this.defaultDetailsLocalStorage.surname + ' ' +this.defaultDetailsLocalStorage.first_name;
    this.getLoggedInUserProfileData();
  }


  // get logged in user profile details and profile image here
  getLoggedInUserProfileData(){
    this._dataService.getMyData(this.defaultDetailsLocalStorage._id).subscribe(res =>{
      this.userDatas = res.others;
      this.userProfilePhoto = this._dataService.backenServerUrl+res.others.image_photo;
      this.userProfilePic = this._dataService.backenServerUrl+res.others.image_photo;
      //console.log('Backend Profile', this.userDatas);
    });
  }

  logoutOut(){
    this.isFormSubmit = true;
    setTimeout(() => {
      localStorage.clear();
      this._router.navigate(['/login']);
      this.closeNavLogoutPopup();
      this.isFormSubmit= false;

      this._authService.loginUser = false;
    }, 2000);


  }

  // logout modal dialog here
  displayStyle = "none";
  openNavLogoutPopup() {
    this.displayStyle = "block";
  }
  closeNavLogoutPopup() {
    this.displayStyle = "none";
  }


  //logged out and clear the local storage here
  // logoutUser(){
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userData');
  //   this._router.navigate(['/login']);
  // }
}
