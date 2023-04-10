import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth-service.service';

declare let $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{


  isFormSubmit = false
  isButtonClick = false

  constructor(private _dataService: ServiceDataService,
    private _authService: AuthServiceService,
    private _router: Router){}


  ngOnInit(): void {

  }


  logoutMeOut(){
    this.isFormSubmit = true;
    setTimeout(() => {
      localStorage.clear();
      this._router.navigate(['/login']);
      this.closeLogoutPopup();
      this.isFormSubmit= false;

      this._authService.loginUser = false;
    }, 2000);
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
