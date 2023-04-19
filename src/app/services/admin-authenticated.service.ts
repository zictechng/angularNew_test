import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatedService implements CanActivate{

  constructor(private _router: Router, private _authService: AuthServiceService) { };
  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');
   // create the custom route guard here
  // this will be use to protect route for unauthorized users not to access a certain page
  canActivate(): boolean{
    if(this._authService.defineAccessLevel(this.myLocalDatails.user_role)){
      return true
    }
    else{
      this._router.navigate(['/login']);
      return false
    }
  }
}
