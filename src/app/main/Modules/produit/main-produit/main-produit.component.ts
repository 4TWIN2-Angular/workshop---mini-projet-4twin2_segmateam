import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-main-produit',
  templateUrl: './main-produit.component.html',
  styleUrls: ['./main-produit.component.scss']
})
export class MainProduitComponent implements OnInit {
  public products ;
  constructor( private _ecommerceService: EcommerceService) { }
  getAllProd() {
    this._ecommerceService.getProducts().subscribe((data) => {
      this.products = data
      this.products = this.products.slice(5,10)
    //  console.log(this.products)
    //  this._ecommerceService.productList = data;
    });}
  ngOnInit(): void {
    this.getAllProd();
   
    
  }

}
