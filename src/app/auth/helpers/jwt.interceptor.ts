import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
   constructor(private _authenticationService: AuthenticationService,  private router:Router) {}

   intercept(
     req: HttpRequest<any>,
     next: HttpHandler
   ): Observable<HttpEvent<any>> {
     if (req.headers.get('No-Auth') === 'True') {
       return next.handle(req.clone());
     }
 
     const token = this._authenticationService.getToken();
 
     req = this.addToken(req, token);
 
     return next.handle(req).pipe(
         catchError(
             (err:HttpErrorResponse) => {
                 console.log(err.status);
                 if(err.status === 401) {
                     this.router.navigate(['/login']);
                 } else if(err.status === 403) {
                     this.router.navigate(['/forbidden']);
                 }
                 return throwError("Some thing is wrong");
             }
         )
     );
   }
 
 
   private addToken(request:HttpRequest<any>, token:string) {
       return request.clone(
           {
               setHeaders: {
                   Authorization : `Bearer ${token}`
               }
           }
       );
   }
 }
 
 