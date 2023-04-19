import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';
import * as Notiflix from 'notiflix';

declare let $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{


  isFormSubmit = false
  isButtonClick = false

  dash_activeLink: string ='';
  userTran_activeLink: string ='';
  acctStatemLinkActive: string ='';
  historyLinkActive: string ='';
  acctLinkActive: string ='';
  dr_activeLink: string ='';
  in_activeLink: string ='';
  supportLinkActive: string ='';

  companyNameSide: any =[];
  company_logoSide: any =[];
  imageUrl: string ='';

  logoAvailable = false;

  // this receives the input value from the parent element which is home component
  @Input() company_short_name: any ='';
  @Input() company_logoUrl: any ='';

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  constructor(private _dataService: ServiceDataService,
    private _authService: AuthServiceService,
    public _authLevel: userLevelAccess,
    private _router: Router){

      // get current route url name
      this._router.events.subscribe((res) => {
        if(this._router.url === "/dashboard/index" || this._router.url === "/dashboard"){
          this.dash_activeLink = 'active';
        }
        else{
          this.dash_activeLink = '';
        }
        if(this._router.url === "/dashboard/wire-transfer" || this._router.url === "/dashboard/domestic-transfer"){
          this.userTran_activeLink = 'active';
        }
        else{
          this.userTran_activeLink = '';
        }
        if(this._router.url === "/dashboard/account-statement"){
          this.acctStatemLinkActive = "active";
        }
        else{
          this.acctStatemLinkActive = '';
        }
        if(this._router.url === "/dashboard/account-history"){
          this.historyLinkActive = "active";
        }
        else{
          this.historyLinkActive = '';
        }
        if(this._router.url ==="/dashboard/profile" || this._router.url ==="/dashboard/officer-profile"){
          this.acctLinkActive = "active";
        }
        else{
          this.acctLinkActive = '';
        }
        if(this._router.url ==="/dashboard/agro-invest" || this._router.url ==="/dashboard/stock-invest" || this._router.url ==="/dashboard/fx-invest"){
          this.in_activeLink="active";
        }
        else{
          this.in_activeLink = "";
        }
        if(this._router.url ==="/dashboard/support"){
          this.supportLinkActive = "active";
        }
        else{
          this.supportLinkActive = "";
        }
      })
    }

  ngOnInit(): void {
    this._authLevel.myAccessLevel();
    this.getCompanyName()
  }

  logoutMeOut(){
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
           this.closeLogoutPopup();
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

  getCompanyName(){
    this._dataService.fetchCompanyDetails().subscribe(res =>{
      this.companyNameSide = res.app_short_name;
      this.company_logoSide = res
      //console.log(this.companyName);
      this.imageUrl = this._dataService.backenServerUrl;
      if(this.company_logoSide.app_logo == '' || this.company_logoSide.app_logo == null){
        this.logoAvailable = true;
      }
      else{
        this.logoAvailable = false;
      }
      //console.log("Company Details", this.companyName)
    })
  }

  // logout modal dialog here
  displayStyle = "none";
  openLogoutPopup() {
    this.displayStyle = "block";
  }
  closeLogoutPopup() {
    this.displayStyle = "none";
  }


  //modal method here
  openLoanModal(id:String){
    $('#'+id).modal('show');
  }
  closeLoanModal(id: String){
  $('#'+ id).modal('hide');
  }

  //modal method here
  openInterBankModal(id:String){
    $('#'+id).modal('show');
  }
  closeInterBankModal(id: String){
  $('#'+ id).modal('hide');
  }
}
