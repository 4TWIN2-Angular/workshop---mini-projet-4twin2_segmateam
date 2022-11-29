import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FactureComponent} from "./facture.component";
import {NewRegSidebarComponent} from "../../Components/new-reglement/new-reglement-sidebar.component";
import {NewFactureComponent} from "./new-facture/new-facture.component";
import {DetailFactureComponent} from "./DetailFacture/detail-facture/detail-facture.component";

const routes: Routes = [
  {
    path: "facture",
    component: FactureComponent,
    children: [
      {
        path: "add-facture",
        component: NewFactureComponent,
      },
    ],
  },
  {path:"detailFacture/:idFacture",component:DetailFactureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
