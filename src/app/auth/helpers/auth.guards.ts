import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthenticationService, UserService } from 'app/auth/service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
   constructor(private _router: Router, private _authenticationService: AuthenticationService,private userService:UserService) {}

   // canActivate
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
   ):
     | Observable<boolean | UrlTree>
     | Promise<boolean | UrlTree>
     | boolean
     | UrlTree {
     if (this._authenticationService.getToken() !== null) {
       const role = route.data['roles'] as Array<string>;
 
       if (role) {
         const match = this.userService.roleMatch(role);
 
         if (match) {
           return true;
         } else {
           this._router.navigate(['/pages/miscellaneous/not-authorized']);
           return false;
         }
       }
     }
 
     this._router.navigate(['/pages/authentication/login-v2']);
     return false;
   }
 }
 