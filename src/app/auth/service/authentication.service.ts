import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  PATH_OF_API = 'http://localhost:9090';
  //public
  public currentUser: Observable<User>;
  public loginstatus:boolean = true;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
   requestHeader = new HttpHeaders({ 'No-Auth': 'True' });//marcher sans kay
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  /**
   * User login
   *
  
   * @returns user
   */
  login(loginData) {
    return this._http
      .post<any>(`${environment.apiUrl}/authenticate`, loginData, {
        headers: this.requestHeader,
      })
      .pipe(
        map(JwtResponse => {
          // login successful if there's a jwt token in the response
          if (JwtResponse) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(JwtResponse.user));
            this.setRoles(JwtResponse.user.role);
            this.setToken(JwtResponse.jwtToken);
            
            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                  ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, ' + JwtResponse.user.userName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(JwtResponse.user);
          }

          return JwtResponse;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
