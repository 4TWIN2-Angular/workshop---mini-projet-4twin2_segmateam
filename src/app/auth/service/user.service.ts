import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
   PATH_OF_API = 'http://localhost:9090';
   requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
   httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
  }
  constructor(private _http: HttpClient,private _authenticationService:AuthenticationService) {}

  /**
   * Get all users
   */
  getAll() {
    return this._http.get<User[]>(`${environment.apiUrl}/users`,this.httpOptions);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  public register(loginData) {
    return this._http.post(this.PATH_OF_API + '/registerNewUser', loginData, {
      headers: this.requestHeader,
    });
  }
  public update(user:User) {
    return this._http.put(this.PATH_OF_API + '/update',user,this.httpOptions);
  }
  public delete(userName:string) {
    return this._http.delete(this.PATH_OF_API + `/delete/${userName}`,this.httpOptions);
  }
  
  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this._authenticationService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
