import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { MainProduitComponent } from './main-produit/main-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';


@NgModule({
  declarations: [
    ListProduitComponent,
    FormProduitComponent,
    MainProduitComponent,
    DetailsProduitComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule
  ]
})
export class ProduitModule { }
