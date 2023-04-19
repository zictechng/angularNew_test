import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
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
  myNotifications: any[] = [];

  isAdmin: boolean = false;
  bgColor: string = '';

  companyLogo: string = '';
  companyShortName: any =[];
  companyName: any =[];
  companyAllName: any = '';

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

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
    this.getNotification();
    this.isAdmin = this._authLevel.myAccessLevel() == 'Admin';
    this.adminLevel();
    this.getCompanyName();
  }

  adminLevel(){
    if(this.isAdmin){
      this.bgColor = 'bg-warning';
    }
    else if(!this.isAdmin){
    this.bgColor = 'bg-navbar-theme';
    }
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

// logout method goes here
  logoutOut(){
    this.isFormSubmit = true;
    setTimeout(() => {
      this._authService.logoutUser(this.myLocalDatails._id).subscribe(res =>{
        if(res.msg == '200'){
          Notiflix.Notify.success('Logout successfully.', {
            width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'right-top',
           });
           localStorage.clear();
           this._router.navigate(['/login']);
           this.closeNavLogoutPopup();
           this.isFormSubmit= false;
           this._authService.userLoginStatus = false;
         }
        else{
          Notiflix.Notify.failure('Sorry! Failed to logout', {
            width: '400px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
           });
        }
      },err =>{
        if(err.status == "404"){
          Notiflix.Notify.failure('Error! No user found', {
            width: '450px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position:'center-bottom'
          });
            }
          else if(err.status == '500'){
            Notiflix.Notify.failure('Error! Server errored occurred', {
               width: '350px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position:'center-bottom'
             });
           }
           this.isFormSubmit = false;
          })
      }, 1000);
  }

  getNotification(){
    this._dataService.fetchUserNotification(this.myLocalDatails._id).subscribe(res =>{
      this.myNotifications = res;
      //console.log("My Notification", this.myNotifications)
    })
  }

  getCompanyName(){
    this._dataService.fetchCompanyDetails().subscribe(res =>{
      this.companyName = res.app_name;
      this.companyAllName = this.companyName;
      console.log("Company Details", this.companyAllName)
    })
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
