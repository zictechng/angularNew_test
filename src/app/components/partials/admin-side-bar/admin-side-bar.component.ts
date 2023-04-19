import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

declare let $: any;
@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit{

dash_activeLink: string ='';
actUser_activeLink: string ='';
pendUser_activeLink: string ='';
tran_activeLink: string ='';
cr_activeLink: string ='';
dr_activeLink: string ='';
in_activeLink: string ='';
adUser_activeLink: string ='';
bnkUser_activeLink: string ='';
sysLogs_activeLink: string ='';
userLogs_activeLink: string ='';

  companyName: any =[];
  company_logo: any =[];
  imageUrl: string ='';

  logoAvailableS = false;

myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  isFormSubmit = false;
  constructor(public _authService: AuthServiceService,
    private _dataService: ServiceDataService,
    public _authLevel: userLevelAccess,
    private _router: Router){

      // get current route url name
      this._router.events.subscribe((res) => {
        if(this._router.url === "/admin/dashboard"){
          this.dash_activeLink = 'active';
        }
        else{
          this.dash_activeLink = '';
        }
        if(this._router.url === "/admin/all-users"){
          this.actUser_activeLink = 'active';
        }
        else{
          this.actUser_activeLink = '';
        }
        if(this._router.url === "/admin/pending-account"){
          this.pendUser_activeLink = "active";
        }
        else{
          this.pendUser_activeLink = '';
        }
        if(this._router.url === "/admin/all-transactions"){
          this.tran_activeLink = "active";
        }
        else{
          this.tran_activeLink = '';
        }
        if(this._router.url ==="/admin/credit-account"){
          this.cr_activeLink = "active";
        }
        else{
          this.cr_activeLink = '';
        }
        if(this._router.url ==="/admin/debit-account"){
          this.dr_activeLink="active";
        }
        else{
          this.dr_activeLink = "";
        }
        if(this._router.url ==="/admin/investment-plans" || this._router.url ==="/admin/user-investment" || this._router.url ==="/admin/investors-earning"){
          this.in_activeLink="active";
        }
        else{
          this.in_activeLink = "";
        }

        if(this._router.url ==="/admin/admin-users"){
          this.adUser_activeLink = "active";
        }
        else{
          this.adUser_activeLink = "";
        }
        if(this._router.url ==="/admin/officer"){
          this.bnkUser_activeLink = "active";
        }
        else{
          this.bnkUser_activeLink = "";
        }
        if(this._router.url ==="/admin/users-logs"){
          this.sysLogs_activeLink = "active";
        }
        else{
          this.sysLogs_activeLink = "";
        }
        if(this._router.url ==="/admin/system-logs"){
          this.userLogs_activeLink = "active";
        }
        else{
          this.userLogs_activeLink = "";
        }
    })
  }



  ngOnInit(): void {
    this.getCompanyName()
  }

  getCompanyName(){
    this._dataService.fetchCompanyDetails().subscribe(res =>{
      this.companyName = res.app_short_name;
      this.company_logo = res
      //console.log(this.companyName);
      this.imageUrl = this._dataService.backenServerUrl;
      if(this.company_logo.app_logo == '' || this.company_logo.app_logo == null){
        this.logoAvailableS = true;

      }
      else{
        this.logoAvailableS = false;
      }
      //console.log("Company Details", this.companyName)
    })
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
           this.closeAdminLogoutPopup();
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

  // logout modal dialog here
  displayStyle = "none";
  openAdminLogoutPopup() {
    this.displayStyle = "block";
  }
  closeAdminLogoutPopup() {
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
