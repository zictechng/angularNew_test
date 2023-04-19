import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

declare let $: any;

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{


  isButtonClick: boolean = false;
  isFormSubmit: boolean = false;

  formDataRecieved: any = {};
  formStockDataRecieved: any ={};
  formFXDataRecieved: any ={};

  verifySuccess: boolean = false;


  fxForm = new FormGroup({
    new_password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    user_id: new FormControl('', [Validators.required])
  });

  forgetForm = new FormGroup({
    forget_details: new FormControl('', [Validators.required]),
  });


  constructor(private _auth: AuthServiceService,
    private _authLevel: userLevelAccess,
    private _router: Router){
    }

  ngOnInit(): void {

  }


    verifyDetails(){
      this.isFormSubmit = true;
      this.formDataRecieved = this.forgetForm.value
      Notiflix.Loading.standard({
        backgroundColor: 'rgba(f,0,f,0.8)',
        });
      setTimeout(() => {
        this._auth.checkUserExist(this.formDataRecieved).subscribe(res =>{
          //console.log("Response received: " + res)
          if(res.msg == "200"){
           this.formFXDataRecieved = res.user._id
            this.fxForm.patchValue({
              user_id: res.user._id,
            })
            Notiflix.Loading.remove();
            //console.log("User ID", this.formFXDataRecieved)
            this.openAgroModal('resetPassModal');
            this.isFormSubmit = false;
          }
        }, err =>{
          if(err.status == "404"){
          Notiflix.Notify.failure('Error! Invalid details', {
            width: '300px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
          });
            }
            else if(err.status == "400"){
          Notiflix.Notify.failure('Error! field required..', {
                width: '300px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
              });
          }
          else if(err.status == '403'){
            Notiflix.Notify.failure('Sorry! Error occurred, try again', {
               width: '330px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '401'){
            Notiflix.Notify.failure('Error! Your account is blocked', {
               width: '400px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           this.isFormSubmit = false;
          Notiflix.Loading.remove();
          })
      }, 500)


    }


  resetPassword(){
    this.isFormSubmit = true;
    this.isButtonClick = true;
    //console.log("Response received: " + this.fxForm.value)
    const password = this.fxForm.value.new_password;
    const confirmP = this.fxForm.value.confirm_password;

    if(this.fxForm.invalid){
      Notiflix.Notify.failure('Some fields are missing', {
        position: 'center-bottom',
         width: '400px',
         showOnlyTheLastOne: true,
         fontSize: '18px',
     });
     this.isButtonClick = false;
    } else if(password != confirmP){
        Notiflix.Notify.failure('Confirm password not matched', {
          position: 'center-bottom',
           width: '400px',
           showOnlyTheLastOne: true,
           fontSize: '18px',
       });
      this.isButtonClick = false;
      }
      else{
        setTimeout(() => {
          this._auth.userUpdatePassword(this.fxForm.value).subscribe(res =>{
            if(res.msg =='201'){
              Notiflix.Notify.success('Password updated successfully', {
                width: '400px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
                });
                 this.isButtonClick = false;
                 this.isFormSubmit = false;
                 this.verifySuccess = true;
                 this.fxForm.reset()
                }
                 else {
                   Notiflix.Notify.warning('Error! Something went wrong, try again', {
                    width: '400px',
                    showOnlyTheLastOne: true,
                    fontSize: '18px',
                    position: 'center-bottom',
                     });
                     this.isButtonClick = false;
                     this.isFormSubmit = false;
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
               this.isButtonClick = false;
               this.isFormSubmit = false;
               })
        }, 500)
      }
  }
    //modal method here
openAgroModal(id:String){
  $('#'+id).modal('show');
}
closeAgroModal(id: String){
$('#'+ id).modal('hide');
}

}
