import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from '../ecommerce.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stat } from 'fs';
@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {
public id 
public prod
open : boolean = false;
  constructor(private activatedroute: ActivatedRoute, private router: Router,private _ecommerceService: EcommerceService,private modalService: NgbModal) {
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.activatedroute.paramMap.subscribe(result =>{ this.id = result.get('id')
    this.prod=this.getById()
  });
    console.log(this.id)
   }

   confirmBox(id:number){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Once deleted the product cant be recovered!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'This product has been deleted and the list may take some time to update',
          'success'
        )
        this._ecommerceService.del(id)
        .subscribe(response => {
         console.log(response)
         
       })
    
        this.router.navigate([ this.router.url.slice(0,13)]);
        this.modalService.dismissAll()
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The product is safe :)',
          'error'
        )
      }
    })
  }

 
   getById() {
    this._ecommerceService.getProductsById(this.id).subscribe((data) => {
      this.prod = data
   
    });}

  ngOnInit(): void {
    this.getById()
    
  }
  modalOpenVC2() {
    this.open=!this.open
    
  }
}
