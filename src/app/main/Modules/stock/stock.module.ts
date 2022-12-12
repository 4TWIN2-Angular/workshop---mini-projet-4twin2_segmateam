import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainstockComponent } from './mainstock/mainstock.component';
import { StockRoutingModule } from './stock-routing.module';
import { AddstockComponent } from './addstock/addstock.component';
import { NgbdTableCompleteModule } from "app/main/Modules/reglement/table-reglement/table-complete.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { ModalAddComponent } from './modal/modal-add/modal-add.component';
import { ModalEditComponent } from './modal/modal-edit/modal-edit.component';


@NgModule({
  declarations: [
    MainstockComponent,
    AddstockComponent,
    ModalComponent,
    ModalAddComponent,
    ModalEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule
  ]
})
export class StockModule { }
