import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-main-produit',
  templateUrl: './main-produit.component.html',
  styleUrls: ['./main-produit.component.scss']
})
export class MainProduitComponent implements OnInit {
  public products ;
  constructor( private _ecommerceService: EcommerceService) { this.getAllProd(); }
  getAllProd() {
    this._ecommerceService.getProducts().subscribe((data) => {
      this.products = data
      this.products = this.products.slice(0,5)
    //  console.log(this.products)
    //  this._ecommerceService.productList = data;
    });}
  ngOnInit(): void {
    this.getAllProd();
    this._ecommerceService.refrD$.subscribe(()=>{
      this._ecommerceService.getProducts().subscribe((data) => {
        this.products = data
        this.products = this.products.slice(0,5)
      
      })
    })
    
  }

}
