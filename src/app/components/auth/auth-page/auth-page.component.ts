import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
                    showOnlyTheLastOne: true,
                });

                localStorage.setItem('token', res.token);
                localStorage.setItem('userData', JSON.stringify(res.userData));
                console.log("User details ", JSON.stringify(res.userData));
                console.log("User Token ", JSON.stringify(res.token));

                this.isFormSubmit = false

                this.clicked = false; // this disables the button when clicked

                this.loginForm.reset(); // clear the form input
                Notiflix.Loading.remove(); // remove the loading indicator
                this._router.navigate(['/dashboard/index']); // after login, go dashboard page
            }
          else {
                Notiflix.Notify.warning('Error! Something went wrong, try again', {
                    width: '200px',
                    showOnlyTheLastOne: true,
                  });
                  Notiflix.Loading.remove();
              }
         }, err =>{
          if(err.status == "401"){
          Notiflix.Notify.warning('Error! No user found', {
            width: '200px',
            showOnlyTheLastOne: true,
          });
            }
            else if(err.status == "400"){
          Notiflix.Notify.warning('Error! Some fields missing..', {
                width: '300px',
                showOnlyTheLastOne: true,
              });
          }
          else if(err.status == '403'){
            Notiflix.Notify.warning('Sorry! Error occurred, try again', {
               width: '300px',
               showOnlyTheLastOne: true,
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '404'){
            Notiflix.Notify.warning('Error! Wrong password', {
               width: '300px',
               showOnlyTheLastOne: true,
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '250px',
               showOnlyTheLastOne: true,
             });
             Notiflix.Loading.remove();
           }

          Notiflix.Loading.remove();
          })
       }

}
