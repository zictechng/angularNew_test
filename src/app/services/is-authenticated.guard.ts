import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _authService: AuthServiceService) { };

  // create the custom route guard here
  // this will be use to protect route for unauthorized users not to access a certain page
  canActivate(): boolean{
    if(this._authService.IsUserAuthenticated()){
      return true
    }
    else{
      this._router.navigate(['/login']);
      return false
    }
  }

}
