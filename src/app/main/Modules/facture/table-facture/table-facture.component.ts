import { Component, OnInit } from '@angular/core';
import {Facture} from "../facture";
import {FactureServiceService} from "../ServiceFacture/facture-service.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-table-facture',
  templateUrl: './table-facture.component.html',
  styleUrls: ['./table-facture.component.scss']
})
export class TableFactureComponent implements OnInit {
  factures: Facture[]

  public editFacture: Facture;
  public deleteFacture: Facture;

  constructor(private fs: FactureServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.fs.GetAllFactures().subscribe(data => {
      this.factures = data
      console.log(this.factures)
    });
  }

  public getFactures(): void {
    this.fs.GetAllFactures().subscribe(data => {
      this.factures = data
      console.log(this.factures)
    });
  }

  public onAddFacture(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();

    this.fs.addFacture(addForm.value).subscribe(
        (response: Facture) => {
          console.log(response);
          this.getFactures();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
    );
  }

  public onUpdateEmloyee(facture: Facture): void {
    this.fs.updateFacture(facture).subscribe(
        (response: Facture) => {
          console.log(response);
          this.getFactures();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  delete(i: number) {
    this.fs.deleteFacture(this.factures[i]).subscribe
    (() => this.fs.GetAllFactures().subscribe(
            res => this.factures = res),
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );

  }

  GoDetails(i: number) {
    this.router.navigate(['detailFacture', i])
  }

}
