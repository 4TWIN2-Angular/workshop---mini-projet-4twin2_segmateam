import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/Modules/produit/ecommerce.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {
  
  // Input Decorotor
  @Input() product;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  
  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */

  constructor(private _ecommerceService: EcommerceService,private modalService: NgbModal) {
   
  }

  ngOnInit(): void {}
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true ,
      size: "lg"
    });}

}
