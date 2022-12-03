import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { TableFactureComponent } from './table-facture/table-facture.component';
import {FormsModule} from "@angular/forms";

import {DlDateTimePickerModule} from "angular-bootstrap-datetimepicker";
import { DetailFactureComponent } from './DetailFacture/detail-facture/detail-facture.component';
import {CoreSidebarModule} from "../../../../@core/components";
import {NewFactureComponent} from "./new-facture/new-facture.component";


@NgModule({
  declarations: [
    FactureComponent,
    TableFactureComponent,
    NewFactureComponent,
    DetailFactureComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    FormsModule,
    DlDateTimePickerModule,
    CoreSidebarModule
  ]
})
export class FactureModule { }
