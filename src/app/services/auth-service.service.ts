import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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


  constructor(private http: HttpClient,
    private _router: Router) { }


    // register method that process the registration request
    registerNewUser(userData:any) {
      return this.http.post<any>(this._registerUrl, userData);
    }

    // login method that process the login request
    loginNewUser(loginData:any) {
      return this.http.post<any>(this._loginUrl, loginData);
    }

}


