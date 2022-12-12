import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurComponent }  from './main/fournisseur.component';
import { NewFounisseurSidebarComponent } from './Nouveau Founisseur/new-fournisseur.component';
import { UpdateDFComponent } from './update-df/update-df.component';
import { UpdateFounisseurSidebarComponent } from './Update/update-founisseur.component';

const routes: Routes = [
  {
    path: '',
    component: FournisseurComponent,
    children: [
      {
        path: "add-fournisseur",
        component:NewFounisseurSidebarComponent ,
      },
      
      {
        path: "update-df/:id",
        component :UpdateDFComponent
      },
      {
        path: "update-fournisseur",
        loadChildren: () =>
          import("./Update/update-founisseur.component").then((m) => m.UpdateFounisseurSidebarComponent),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
