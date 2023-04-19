import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-nav-notification',
  templateUrl: './nav-notification.component.html',
  styleUrls: ['./nav-notification.component.css']
})
export class NavNotificationComponent implements OnInit{


  myNotifications: any[] = [];


  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');
  isButtonClick: boolean = false;
  isDeleteSubmit: boolean = false;
  confirmModalActive: boolean = false;



  constructor(private _dataService: ServiceDataService,
    private _authService: AuthServiceService,
    public _authLevel: userLevelAccess,
    private _router: Router){}


  ngOnInit(): void {
    this.getNotification()
  }


  getNotification(){
    this._dataService.fetchUserNotification(this.myLocalDatails._id).subscribe(res =>{
      this.myNotifications = res;
      //console.log("My Notification", this.myNotifications)
    })
  }


  markAllAsRead(){
    this.isDeleteSubmit = true
    this._dataService.markUserAllRead(this.myLocalDatails._id).subscribe(res =>{
      if(res.msg == '200'){
        this.getNotification();
        this.isDeleteSubmit = false;
        this.closeConfirmCreditModal();
        this.isButtonClick = false;
      }
    })
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
    this.confirmModalActive = false;
  }
}
