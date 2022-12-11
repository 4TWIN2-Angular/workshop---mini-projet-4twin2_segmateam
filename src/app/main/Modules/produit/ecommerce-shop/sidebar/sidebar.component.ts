import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from '../../ecommerce.service';
import { EcommerceShopComponent } from '../ecommerce-shop.component';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit {
  // Public
  public sliderPriceValue = [1, 100];

  constructor(private _ecommerceService: EcommerceService , private mainComp :EcommerceShopComponent) {}

  ngOnInit(): void {}
  filter(arg : string){
   this.mainComp.filter(arg)

  }
}
