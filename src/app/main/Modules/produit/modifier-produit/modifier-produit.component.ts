import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { EcommerceService } from '../ecommerce.service';
import { products } from '../Model/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.scss']
})
export class ModifierProduitComponent implements OnInit {
 
    @Input() open: any ;
    @Input() prod: products;
    @ViewChild('modalVC2') input; 
    
    editForm = new FormGroup({
      id : new FormControl('', Validators.required),
      libelle: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      dateModif: new FormControl({disabled: true}),
      code: new FormControl('', Validators.required),
    });
  
   

  submitted = false;
  onSubmit() { this.submitted = true; 
    console.warn(this.editForm.value);
    
      this.prod.libelleProduit = this.editForm['libelle'].value
      this.prod.prix = this.editForm['prix'].value
      this.prod.dateDernierModification = this.editForm['dateModif'].value
      this.prod.codeProduit = this.editForm['code'].value
      console.log(this.prod)
     /*  this.ecomService.updateData(this.editForm.value)
     .subscribe(response => {
      console.log(response)
    }) */
    
  }


 /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private ecomService: EcommerceService,private modalService: NgbModal) { 
    
   
  }

  ngOnInit(): void {
  
    this.editForm.setValue({
      id : this.prod.idProduit,
      prix : this.prod.prix,
      libelle : this.prod.libelleProduit,
      dateModif : new Date (),
      code : this.prod.codeProduit

    })
 
  }
  

   /*  alertWithSuccess(){
      Swal.fire('Well done...', 'The new '+this.model.libelleProduit+' has been added succesfully!', 'success')
    } */
    

    ngOnChanges(changes: SimpleChanges) {
       console.log(changes.open )
       if(changes.open['previousValue'] !=null){
        this.modalService.open(this.input, {
        centered: true
        
      });
    
      }
    }

}
