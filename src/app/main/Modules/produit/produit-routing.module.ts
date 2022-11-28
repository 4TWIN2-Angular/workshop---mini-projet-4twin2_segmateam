import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { MainProduitComponent } from './main-produit/main-produit.component';

const routes: Routes = [ {path: '', component: MainProduitComponent , 
children:[
  {path: 'category/:type', component: ListProduitComponent , 
  children:[
    {path: 'details/:id', component: DetailsProduitComponent},  
  ]}, {path: 'ajouter', component: FormProduitComponent}             ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
