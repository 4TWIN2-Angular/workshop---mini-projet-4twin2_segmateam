import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EcommerceService } from '../ecommerce.service';
import { products } from '../Model/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.scss']
})
export class FormProduitComponent implements OnInit {

 
  public obj: any = {};
  imgg :any
  url:any
  responses: Array<any>;
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
    @ViewChild('img') input :ElementRef; 
    submitted = false;
   


    async onSubmit(form :NgForm) { this.submitted = true; 
      if (form.valid){
        await this.upload()
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

  constructor(private ecomService: EcommerceService,private modalService: NgbModal,
    public datepipe: DatePipe,
  ) { 
      
      
    }

 
    onFileSelect(input) {
      
     // console.log(input.files);
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
        //  console.log('Got here: ', e.target.result);
          this.obj.photoUrl = e.target.result;
          console.log(e.target.result)
          this.imgg =e.target.result

        }
        reader.readAsDataURL(input.files[0]);
       
      }
    }

    async upload(){
      const base64Image = this.imgg
      const formData = new FormData()
      formData.append('file', base64Image)
      formData.append('upload_preset', 'angular')
      
      await fetch(`https://api.cloudinary.com/v1_1/dnnhnqiym/image/upload`, {
        method: 'POST',
        body: formData,
      }).then((response) => response.json())
      .then((data) => {
        this.url = data.secure_url
        this.model.image= this.url
        console.log(this.model.image= this.url)
      });
     
    }

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
