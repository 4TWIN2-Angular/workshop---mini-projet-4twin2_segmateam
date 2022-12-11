import { Component, OnInit } from '@angular/core';
import { User } from 'app/auth/models';
import { AuthenticationService, UserService } from 'app/auth/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reglement',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
user:User;
userList:User[];
c:number;
co:number;
ca:number;
public currentUser: User;
public contentHeader: object;
count=this.userService.count().subscribe((data: number) => {
  this.c = data;
});
countoperateur=this.userService.countoperateur().subscribe((data: number) => {
  this.co = data;
});
countadmin=this.userService.countadmin().subscribe((data: number) => {
  this.ca = data;
});
 // private
 private _unsubscribeAll: Subject<any>;
  constructor(private userService:UserService,private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.c);
    this.contentHeader = {
      headerTitle: '  Admin',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Liste Des Utilisateurs',
            isLink: false
          }
        ]
      }
    };
    this.user = new User();
    //getEtudiants
    this.userService.getAll().subscribe((data: User[]) => {
      this.userList = data;
    });
  }
  delete(userName: string) {
    this.userService.delete(userName).subscribe((data) => {
      console.log(data);
      this.userService.getAll();
      location.reload();
    
  })
}

}
