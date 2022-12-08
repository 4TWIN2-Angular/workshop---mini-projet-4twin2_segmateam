import { Component, OnInit } from '@angular/core';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';

@Component({
  selector: 'app-reglement',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
user:User;
userList:User[];
public contentHeader: object;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
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
