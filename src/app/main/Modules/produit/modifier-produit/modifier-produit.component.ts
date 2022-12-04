import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { EcommerceService } from '../ecommerce.service';
import { products } from '../Model/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  myDate: any;
  onSubmit() { this.submitted = true; 
    
      
      this.prod.libelleProduit = this.editForm.value['libelle']
      this.prod.prix = this.editForm.value['prix']
      this.prod.dateDernierModification = this.editForm.value['dateModif']
      this.prod.codeProduit = this.editForm.value['code']
      console.log(this.prod)
      this.ecomService.updateData(this.prod)
     .subscribe(response => {
      console.log(response)
    })
    
  }


 /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private ecomService: EcommerceService,private modalService: NgbModal,private datePipe: DatePipe) { 
    
   
  }

  ngOnInit(): void {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    
    this.editForm.setValue({
      id : this.prod.idProduit,
      prix : this.prod.prix,
      libelle : this.prod.libelleProduit,
      dateModif :  this.myDate,
      code : this.prod.codeProduit

    })
 
  }
  

    alertWithSuccess(){
      Swal.fire('Update Successful...', 'The '+this.prod.libelleProduit+' has been updates succesfully!', 'success')
    }
    

    ngOnChanges(changes: SimpleChanges) {
       console.log(changes.open )
       if(changes.open['previousValue'] !=null){
        this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.editForm.setValue({
          id : this.prod.idProduit,
          prix : this.prod.prix,
          libelle : this.prod.libelleProduit,
          dateModif : this.myDate,
          code : this.prod.codeProduit
    
        })
        this.modalService.open(this.input, {
        centered: true
        
      });
    
      }
    }

}
