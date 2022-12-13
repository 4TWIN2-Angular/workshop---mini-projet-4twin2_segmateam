import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor() { }

  
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }
  //
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }
  //
  public setuser_first_name(user_first_name: string) {
    localStorage.setItem('user_first_name', user_first_name);
  }

  public getuser_first_name(): string {
    return localStorage.getItem('user_first_name');
  }
  //
  public setuser_last_name(user_last_name: string) {
    localStorage.setItem('user_last_name', user_last_name);
  }

  public getuser_last_name(): string {
    return localStorage.getItem('user_last_name');
  }
  //
  public clear() {
    localStorage.clear();
  }


}
