import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture';
import { FactureServiceService } from '../ServiceFacture/facture-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-update-facture',
  templateUrl: './update-facture.component.html',
  styleUrls: ['./update-facture.component.scss']
})
export class UpdateFactureComponent implements OnInit {

  dateC:any;
  dateD:any  ;
  facture:any ;
id:number ; 


  constructor(
    private _coreSidebarService: CoreSidebarService
    ,private route:Router ,private fs:FactureServiceService,
    private ac:ActivatedRoute) { }
    toggleSidebar(name): void {
      this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }
  
    submit(form) {
      if (form.valid) {
       
      }
      this.EditFacture();
      console.warn(form.value);
    }

    GetFactureById(id:number) {
this.facture = this.fs.GetFactureById(id); 

    
        console.log("iffacture yrrrrrr" , this.facture)
    }


    EditFacture(){
      this.fs.updateFacture(this.facture).subscribe(data=>
        Swal.fire('Reglement modifié!', 'Le reglement a été bien modifié', 'success') 
    )
    this.ngOnInit();
    }
  ngOnInit(): void {

    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('idFacture') ;
    this.GetFactureById(this.id);
  console.log(this.id) ; }) ;



   
  }

 
}
