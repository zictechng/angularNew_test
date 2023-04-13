import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  // variable to check if user click on the submit button
  isFormSubmit = false;
  userDataReceived: any = {}

  clicked: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  });
  constructor(private _auth: AuthServiceService,
    private _authLevel: userLevelAccess,
    private _router: Router){}


  ngOnInit(): void {

  }

  loginUser(){
    this.isFormSubmit = true
    this.clicked = true;
    this.userDataReceived  = this.loginForm.value;

    Notiflix.Loading.standard({
      backgroundColor: 'rgba(f,0,f,0.8)',
      });

     this._auth.loginNewUser(this.userDataReceived).subscribe(res =>{
          if(res.msg == '200')
            {
              Notiflix.Notify.success(' Successfully Login', {
                success: {
                    background: '#1EAAE7',
                    },
                    width: '300px',
                    showOnlyTheLastOne: true,
                    fontSize: '18px',
                });

                localStorage.setItem('token', res.token);
                localStorage.setItem('userData', JSON.stringify(res.userData));

                this._auth.loginUser = true;
                this.isFormSubmit = false

                // get user role level here
                this._authLevel.myLevel = res.userData.user_role;
                this.clicked = false; // this disables the button when clicked

                this.loginForm.reset(); // clear the form input
                Notiflix.Loading.remove(); // remove the loading indicator
                // check user role and redirect to page
                if(this._authLevel.myLevel == "User"){
                  this._router.navigate(['/dashboard']);
                }
                else if(this._authLevel.myLevel == "Admin"){
                  this._router.navigate(['/admin']);
                }

                //this._router.navigate(['/dashboard/index']); // after login, go dashboard page
            }
          else {
                Notiflix.Notify.warning('Error! Something went wrong, try again', {
                    width: '350px',
                    showOnlyTheLastOne: true,
                    fontSize: '18px',
                  });
                  Notiflix.Loading.remove();
                  this.clicked = false;
              }
         }, err =>{
          if(err.status == "401"){
          Notiflix.Notify.warning('Error! No user found', {
            width: '250px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
          });
            }
            else if(err.status == "400"){
          Notiflix.Notify.warning('Error! Some fields missing..', {
                width: '300px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
              });
          }
          else if(err.status == '403'){
            Notiflix.Notify.warning('Sorry! Error occurred, try again', {
               width: '330px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '404'){
            Notiflix.Notify.warning('Error! Wrong password', {
               width: '300px',
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
           this.clicked = false;
          Notiflix.Loading.remove();
          })
       }

}
