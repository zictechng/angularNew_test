import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{



  myId : any = JSON.parse(localStorage.getItem('userData')|| '{}');
  defaultImageProfile: string = '';
  defaultDetailsLocalStorage: any;
  userProfilePhoto = '';
  userProfilePic = '';
  myData : any = this.myId;
  isFormSubmit: boolean = false;
  isbuttonClick = false;

  resetPasswordForm = new FormGroup({
    new_password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    user_id: new FormControl(this.myId._id, [Validators.required])
  });


  constructor(private _dataService: ServiceDataService,
    private _auth: AuthServiceService,
    private _router: Router) {}


  ngOnInit(): void {
    this.defaultImageProfile = this._dataService.getDefaultImage();
    this.defaultDetailsLocalStorage = this._dataService.getUserLocalInfomation();
    this.userProfilePic = this._dataService.backenServerUrl+this.defaultDetailsLocalStorage.image_photo;
  }


  updatePassword(){
    this.isFormSubmit = true;
    this.isbuttonClick = true;
    //console.log("Samples updated", this.resetPasswordForm.value)
    const password = this.resetPasswordForm.value.new_password;
    const confirmP = this.resetPasswordForm.value.confirm_password;

    if(this.resetPasswordForm.invalid){
      Notiflix.Notify.failure('Some fields are missing', {
        position: 'center-bottom',
         width: '400px',
         showOnlyTheLastOne: true,
         fontSize: '18px',
     });
     this.isbuttonClick = false;
    } else if(password != confirmP){
        Notiflix.Notify.failure('Confirm password not matched', {
          position: 'center-bottom',
           width: '400px',
           showOnlyTheLastOne: true,
           fontSize: '18px',
       });
      this.isbuttonClick = false;
      }
      else{
        setTimeout(() => {
          this._auth.userUpdatePassword(this.resetPasswordForm.value).subscribe(res =>{
            if(res.msg =='201'){
              Notiflix.Notify.success('Password updated successfully', {
                position: 'center-bottom',
                width: '400px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
                });
                 this.isbuttonClick = false;
                 this.isFormSubmit = false;
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
                Notiflix.Notify.failure('Error! No user found, try again', {
                   width: '350px',
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
        }, 500)
      }
  }



}
