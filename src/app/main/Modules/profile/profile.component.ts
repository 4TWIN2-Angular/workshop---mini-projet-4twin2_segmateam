import { Component, OnInit } from "@angular/core";
import { Subject } from 'rxjs';

import { FlatpickrOptions } from 'ng2-flatpickr';

import { AuthenticationService, UserService } from "app/auth/service";
import { User } from "app/auth/models";

import { Router } from "@angular/router";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
     // public
  public user:User;
  public currentUser: User;
  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: string;

  // private
  private _unsubscribeAll: Subject<any>;
  
  constructor(
    private router: Router,private userService: UserService,private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this._unsubscribeAll = new Subject();
  }

// Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */
   togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contentHeader = {
        headerTitle: ' Paramètres du compte',
        actionButton: true,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Paramètres du compte',
              isLink: false
            }
          ]
        }
      };
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
   
  }
  update() {
    this.userService.update(this.user).subscribe((result) => {
      if (result) {
        console.log('this.user:', this.user);
        this.router.navigate(['/home'])
        //this.etudiantList = [this.etudiant, ...this.etudiantList];
        //location.reload();
      }
    });
  }
}