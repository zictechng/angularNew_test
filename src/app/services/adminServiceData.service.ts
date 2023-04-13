import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


// base url of the server
const serverUrl = 'http://localhost:3500/';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceDataService {


private _userDataFetchEditUrl = serverUrl+'api/fetch_edit_user/';


constructor(private http: HttpClient,
  private _router: Router) { }


// fetch edit user account
fetchEditUser(user_ID: any){
  return this.http.get<any>(this._userDataFetchEditUrl + user_ID);
}

}
