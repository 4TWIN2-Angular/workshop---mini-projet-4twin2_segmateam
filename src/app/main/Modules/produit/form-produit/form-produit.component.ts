import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EcommerceService } from '../ecommerce.service';
import { products } from '../Model/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { format } from 'path';
import { DatePipe, formatDate } from '@angular/common'
@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.scss']
})
export class FormProduitComponent implements OnInit {
  model : products = {
    idProduit:null,
    libelleProduit: "Phone" ,
    image: "assets/images/pages/eCommerce/8.png",
    prix: 528 ,
    dateCreation: new Date() ,
    dateDernierModification:new Date(),
    archive: false ,
    categorieProduit:null,
    detailFactures: null,
    codeProduit: "544",
    stock: null,
    
    };

    submitted = false;
   
    onSubmit(form :NgForm) { this.submitted = true; 
      if (form.valid){
        this.model.dateDernierModification = this.model.dateCreation
     
       
        this.ecomService.postData(this.model)
       .subscribe(response => {
        console.log(response)
      })
      }
      //form.reset()
    
    }
 
  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */

  constructor(private ecomService: EcommerceService,private modalService: NgbModal,public datepipe: DatePipe) { }

  ngOnInit(): void {
  

  }
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
    
  }
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });}

    alertWithSuccess(){
      Swal.fire('Well done...', 'The new '+this.model.libelleProduit+' has been added succesfully!', 'success')
    }
     
}
