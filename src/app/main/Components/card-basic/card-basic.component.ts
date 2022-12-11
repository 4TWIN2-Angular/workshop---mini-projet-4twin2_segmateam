import { Component, OnInit } from '@angular/core';
import { FactureServiceService } from 'app/main/Modules/facture/ServiceFacture/facture-service.service';
import { EcommerceService } from 'app/main/Modules/produit/ecommerce.service';
import { ReglementService } from 'app/main/Modules/reglement/reglement.service';

@Component({
  selector: 'app-basic-card',
  templateUrl: './card-basic.component.html'
})
export class CardBasicComponent implements OnInit {
  // public
  public contentHeader: object;
  ReglementCount:number;
  ProductsCount:number;
  FacturesCount:number;
  constructor(
    public serviceR: ReglementService,
    public serviceP:EcommerceService,
    public serviceF:FactureServiceService
  ) {}

  async getAllReglements() {
    await this.serviceR.GetAllReglements().subscribe((data) => {
      this.ReglementCount=data.length;
   console.log("eww",this.ReglementCount);
  });
}
async getProducts(){
  await this.serviceP.getProducts().subscribe((data)=>{
    this.ProductsCount=data.length
    console.log("eww2",this.ProductsCount);
  })
}
async getFactures(){
  await this.serviceF.GetAllFactures().subscribe((data)=>{
    this.FacturesCount=data.length
    console.log("eww3",data.length);
  })
}
  ngOnInit() {
    this.getAllReglements();
    this.getProducts();
    this.getFactures()

  }
}
