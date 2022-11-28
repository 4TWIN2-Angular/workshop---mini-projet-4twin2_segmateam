import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from '../ecommerce.service';
@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {
public id 
public prod
  constructor(private activatedroute: ActivatedRoute, private router: Router,private _ecommerceService: EcommerceService) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.activatedroute.paramMap.subscribe(result =>{ this.id = result.get('id')
    this.prod=this.getById()
  });
    console.log(this.id)
   }
   getById() {
    this._ecommerceService.getProductsById(this.id).subscribe((data) => {
      this.prod = data
     console.log(this.prod)
    });}

  ngOnInit(): void {
    this.getById()
    
  }

}
