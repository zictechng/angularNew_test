import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// base url of the server
const serverUrl = 'http://localhost:3500/';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

// server endpoint that receives information goes here
// private _registerUrl = serverUrl+'api/users';
  private _registerUrl = serverUrl+'api/register';
  private _loginUrl = serverUrl+'api/login';
  private _userPasswordUpdateUrl = serverUrl+'api/user_update_password';
  private _userLogoutUrl = serverUrl+'api/user_logout/';
  private _verifyResetUrl = serverUrl+'api/verify_reset_password';


  private _orderDataStream = new BehaviorSubject("");

  constructor(private http: HttpClient,
    private _router: Router) { }

    userLoginStatus: boolean = false; // declare variables to hold user loggin information
    userAccessLevel: boolean = false; // declare variables to hold user loggin information

    // register method that process the registration request
    registerNewUser(userData:any) {
      return this.http.post<any>(this._registerUrl, userData);
    }

    // method that check if user is logged in and return true
    IsUserAuthenticatedT(){
      return this.userLoginStatus;
    }
     //passing order form data to another page here
     IsUserAuthenticated(){ // get the data info
      return !! localStorage.getItem('token'); // then !! mean is a boolean operation to return
    }

     //passing order form data to another page here
     getToken(){ // get the data info
      return localStorage.getItem('token'); // then !! mean is a boolean operation to return
    }

    orderDataPassed(data: any){ // receive the info fill into the form here
      this._orderDataStream.next(data);
    }

    // login method that process the login request
    loginNewUser(loginData:any) {
      return this.http.post<any>(this._loginUrl, loginData);
    }

    defineAccessLevel(role_data:any) {
      if(role_data == null || role_data !="Admin"){
        return false
      }
      else{
        return true;
      }
    }

    // user password update method that process the request
    userUpdatePassword(pData:any) {
      return this.http.post<any>(this._userPasswordUpdateUrl, pData);
    }

    // forget password reset verify process the request
    checkUserExist(pData:any) {
      return this.http.post<any>(this._verifyResetUrl, pData);
    }

    // user password update method that process the request
    logoutUser(userData:any) {
      return this.http.get<any>(this._userLogoutUrl +userData);
    }



}


