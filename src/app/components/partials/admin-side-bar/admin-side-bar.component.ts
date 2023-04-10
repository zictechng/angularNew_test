import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';

declare let $: any;
@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit{



  isFormSubmit = false;
  constructor(public _authService: AuthServiceService,
    private _dataService: ServiceDataService,
    private _router: Router){}


  ngOnInit(): void {

  }

  logoutMeOut(){
    this.isFormSubmit = true;
    setTimeout(() => {
      localStorage.clear();
      this._router.navigate(['/login']);
      this.closeAdminLogoutPopup();
      this.isFormSubmit= false;

      this._authService.loginUser = false;
    }, 2000);
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
