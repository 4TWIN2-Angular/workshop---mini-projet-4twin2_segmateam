  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { TableFactureComponent } from './table-facture/table-facture.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DlDateTimePickerModule} from "angular-bootstrap-datetimepicker";
import { DetailFactureComponent } from './DetailFacture/detail-facture/detail-facture.component';
import {CoreSidebarModule} from "../../../../@core/components";
import {NewFactureComponent} from "./new-facture/new-facture.component";
import { UpdateDetailFactureComponent } from './DetailFacture/update-detail-facture/update-detail-facture.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateFactureComponent } from './update-facture/update-facture.component';
import { AddDetailFactureComponent } from './DetailFacture/add-detail-facture/add-detail-facture.component';
import { AffiDetailFactureComponent } from './DetailFacture/affi-detail-facture/affi-detail-facture.component';


@NgModule({
  declarations: [
    FactureComponent,
    TableFactureComponent,
    NewFactureComponent,
    DetailFactureComponent,
   
    UpdateDetailFactureComponent,
        UpdateFactureComponent,
        AddDetailFactureComponent,
        AffiDetailFactureComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    FormsModule,
    DlDateTimePickerModule,
    NgbModule ,
    CoreSidebarModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    
  ]
})
export class FactureModule { }
