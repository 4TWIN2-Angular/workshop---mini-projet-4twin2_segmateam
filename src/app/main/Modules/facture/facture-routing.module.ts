import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailFactureComponent } from './DetailFacture/add-detail-facture/add-detail-facture.component';
import { DetailFactureComponent } from './DetailFacture/detail-facture/detail-facture.component';
import { UpdateDetailFactureComponent } from './DetailFacture/update-detail-facture/update-detail-facture.component';
import {FactureComponent} from "./facture.component";
import { NewFactureComponent } from './new-facture/new-facture.component';
import { TableFactureComponent } from './table-facture/table-facture.component';
import { UpdateFactureComponent } from './update-facture/update-facture.component';

const routes: Routes = [
  {
    path: '',
    component: FactureComponent,
    children: [
      {
        path: "add-facture",
        component: NewFactureComponent,
      },
      {
        path: "table-facture",
        component: TableFactureComponent
      },
      {
      path:"update-facture/:idFacture" ,
      component :UpdateFactureComponent
      } ,

      {
        path: "updateDf/:idDetailFacture",
        component: UpdateDetailFactureComponent,
      },
      {
        path : "addDetailFac/:idF" ,
        component:AddDetailFactureComponent
      }
      

   
    ],
  },

 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
