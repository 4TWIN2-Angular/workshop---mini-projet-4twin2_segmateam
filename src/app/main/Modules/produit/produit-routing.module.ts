import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { EcommerceShopComponent } from './ecommerce-shop/ecommerce-shop.component';
import { EcommerceService } from './ecommerce.service';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { MainProduitComponent } from './main-produit/main-produit.component';


const routes: Routes = [ {path: 'home', component: MainProduitComponent ,children:[
  {path: 'info/:id' , component:DetailsProduitComponent}
]

},
{path: 'list', component: ListProduitComponent ,children:[
  {path: 'info/:id' , component:DetailsProduitComponent}
]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
