import { Component, OnInit } from "@angular/core";
import { Subject } from 'rxjs';

import { FlatpickrOptions } from 'ng2-flatpickr';

import { AuthenticationService, UserService } from "app/auth/service";
import { User } from "app/auth/models";

import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
     // public
  updateForm:FormGroup;
  public user:User;
  userName:string;
  userFirstName:string;
  userLastName:string;
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
    this.updateForm = new FormGroup({
      userName: new FormControl(this.currentUser.userName),
      userFirstName: new FormControl(this.currentUser.userFirstName),
      userLastName: new FormControl(this.currentUser.userLastName)
    });
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

  
  update(form: FormGroup) {
    
    console.log('this.user:', this.currentUser);
    this.currentUser.userFirstName=this.updateForm.value.userFirstName;
    this.currentUser.userLastName=this.updateForm.value.userLastName;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    console.log('this.user:', this.currentUser);
   
 

   
    this.userService.update(this.currentUser).subscribe((result) => {
      if (result) {
        console.log('this.user:', this.user);
        this.router.navigate(['/home'])
        //this.etudiantList = [this.etudiant, ...this.etudiantList];
        //location.reload();
      }
    });
  }
}