import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/Modules/produit/ecommerce.service';

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
  constructor(private _ecommerceService: EcommerceService) {
   
  }

  ngOnInit(): void {}
}
