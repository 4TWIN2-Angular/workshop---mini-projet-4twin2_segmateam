import { Component, OnInit, ViewChild } from '@angular/core';
import {CoreSidebarService} from "../../../../../@core/components/core-sidebar/core-sidebar.service";
import {FactureServiceService} from "../ServiceFacture/facture-service.service";
import {DetailFacture} from "../DetailFacture/detail-facture/DetailFacture";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Facture} from "../facture";
import {HttpErrorResponse} from "@angular/common/http";
import { NgbDate, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatter } from "utils/dateformat";
import {
  DlDateTimeDateModule,
  DlDateTimePickerModule,
} from "angular-bootstrap-datetimepicker";
import { DatePipe, formatDate } from '@angular/common';



@Component({
  selector: 'app-new-facture',
  templateUrl: './new-facture.component.html',
  styleUrls: ['./new-facture.component.scss']
})
export class NewFactureComponent implements OnInit {
  currentDate = new Date();
 
  regform = new FormGroup ({
   
    montantRemise : new FormControl("",[  
      Validators.required,
     Validators.pattern("^[0-9]*$")
    ]) ,
    montantFacture : new FormControl("",[  
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.min(500)
    ]),
    dateCreationFacture : new FormControl(    ),
    dateDernierModification :  new FormControl(""),
    archive:  new FormControl(""),
    
  
  });
 
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService,private fs:FactureServiceService,private route :ActivatedRoute,private router:Router) { }

   /**
   * Toggle the sidebar
   *
   * @param name
   */
    toggleSidebar(name): void {
      this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }


    AddFacture() {
    
      this.fs.addFacture(this.regform.value).subscribe();
      console.log("form updated",this.regform.value);}

  
  /**
   * Submit
   *
   * @param form
   */
  submit(form )  : void {
    if (form.valid) {
      this.toggleSidebar("new-facture");
      form.reset();
    }

  }




  ngOnInit(): void {
    console.log("loaded");
    console.log("ROUTEEE",this.route);
 
    
  }
  ngOnDestroy(): void {}


}

