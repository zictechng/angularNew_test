import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  myId : any = JSON.parse(localStorage.getItem('userData')|| '{}');
  defaultImageProfile: string = '';
  defaultDetailsLocalStorage: any;
  userProfilePhoto = '';
  userProfilePic = '';
  myData : any = this.myId;
  isbuttonClick = false;

  blockAccountForm = new FormGroup({
    block_id: new FormControl(this.myData._id, [Validators.required, Validators.maxLength(25)]),

  });


  constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _router: Router) {}


  ngOnInit(): void {
    this.defaultImageProfile = this._dataService.getDefaultImage();
    this.defaultDetailsLocalStorage = this._dataService.getUserLocalInfomation();
    this.userProfilePic = this._dataService.backenServerUrl+this.defaultDetailsLocalStorage.image_photo;
  }

  // method to block user account
  blockMyAccount(){
    this.isbuttonClick = true
    this._dataService.userAcctBlocked(this.blockAccountForm.value).subscribe(res =>{
      if(res.msg =='201'){
       Notiflix.Notify.success('Your account is blocked successfully', {
          success: {
              background: '#1EAAE7',
              },
              position: 'center-bottom',
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
          });
          this.isbuttonClick = false
         }
          else {
            Notiflix.Notify.warning('Error! Something went wrong, try again', {
                width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
                position: 'center-bottom',
              });
              this.isbuttonClick = false
          }
        }, err =>{
        if(err.status == "401"){
          Notiflix.Notify.warning('Error! Invalid details', {
            width: '300px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
            }
           else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
           }
           else if(err.status == '404'){
            Notiflix.Notify.failure('Error! No record found, try again', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
           }
           else if(err.status == '403'){
            Notiflix.Notify.failure('Error, Operation failed! try again', {
               width: '350px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
           }
           this.isbuttonClick = false
           })
      }

}
