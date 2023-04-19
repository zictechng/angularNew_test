import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-nav-drop-menu',
  templateUrl: './nav-drop-menu.component.html',
  styleUrls: ['./nav-drop-menu.component.css']
})
export class NavDropMenuComponent implements OnInit {

  isButtonClick: boolean = false;
  isDeleteSubmit: boolean = false;


  constructor(private _dataService: ServiceDataService,
    private _authService: AuthServiceService,
    public _authLevel: userLevelAccess,
    private _router: Router){}

  ngOnInit(): void {

  }


  displayStyle = "none";
  displayStyleConfirm = "none";
  // confirm before crediting user account modal dialog here
  openConfirmCreditModal() {
    this.displayStyleConfirm = "block";
    this.isButtonClick =true;
  }
  closeConfirmCreditModal() {
    this.displayStyleConfirm = "none";
    this.isDeleteSubmit =false
    this.isButtonClick =false;

  }

}
