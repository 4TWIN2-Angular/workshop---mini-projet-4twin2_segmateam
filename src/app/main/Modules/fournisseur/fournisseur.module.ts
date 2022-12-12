import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurComponent }  from './main/fournisseur.component';
import { FournisseurCompleteModule } from './List-fournisseur/FournisseurCompleteModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FournisseurComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FournisseurRoutingModule,
    FournisseurCompleteModule,
    ReactiveFormsModule

   
  ]
})
export class FournisseurModule { }
