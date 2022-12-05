import { Component, OnInit } from '@angular/core';
import {CoreSidebarService} from "../../../../../@core/components/core-sidebar/core-sidebar.service";
import {FactureServiceService} from "../ServiceFacture/facture-service.service";
import {DetailFacture} from "../DetailFacture/detail-facture/DetailFacture";
import {FormGroup, NgForm} from "@angular/forms";
import {Facture} from "../facture";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-facture',
  templateUrl: './new-facture.component.html',
  styleUrls: ['./new-facture.component.scss']
})
export class NewFactureComponent implements OnInit {
  idFacture : number
 public montantRemise
  public montantFacture
 public dateCreationFacture ;
  public dateDerniereModification ;
  public archive
f:Facture[]
    myForm :FormGroup
  constructor(private _coreSidebarService: CoreSidebarService,private fs:FactureServiceService) { }

    toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
public getFacture():void {
    this.fs.GetAllFactures().subscribe(data => {
        this.f = data
        console.log(this.f)
    });
}
  /**
   * Submit
   *
   * @param form
   */
  submit(form :NgForm)  : void {
      document.getElementById('add-employee-form').click();
      this.fs.addFacture(form.value).subscribe(
          (response: Facture) => {
              console.log(response);
              this.getFacture();
              form.reset();
          },
          (error: HttpErrorResponse) => {
              alert(error.message);
              form.reset();
          }
      );


      // this.facture.montantRemise=form.controls['autres'].get('montantRemise').value
      // this.facture.montantFacture=form.controls['autres'].get('montantFacture').value
      // this.facture.dateCreationFacture=form.controls['autres'].get('dateCreationFacture').value
      // this.facture.dateDerniereModification=form.controls['autres'].get('dateDerniereModification').value
      //
      //
      // this.fs.addFacture(this.facture).subscribe()
      // if (form.valid) {
      //     this.toggleSidebar("new-facture-sidebar");
      // }
  }




  ngOnInit(): void {
    console.log("loaded");
  }

  addUser(){
      console.log("jjjjjj")
  }

}

