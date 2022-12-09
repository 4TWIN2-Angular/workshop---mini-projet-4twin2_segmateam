import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CoreSidebarModule } from "@core/components";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbdSortableHeader } from "./sortable.directive";
import {FournisseurComplete} from "./FournisseurComplete"
import {
  DlDateTimeDateModule,
  DlDateTimePickerModule,
} from "angular-bootstrap-datetimepicker";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { GoogleMapsModule } from "@angular/google-maps";
import { NewFounisseurSidebarComponent } from "../Nouveau Founisseur/new-fournisseur.component";
import { RouterModule } from "@angular/router";
import { RowComponent } from "./Details/Row.component";
import { UpdateFounisseurSidebarComponent } from "../Update/update-founisseur.component";

@NgModule({
    declarations: [FournisseurComplete, NgbdSortableHeader, NewFounisseurSidebarComponent,
        RowComponent,UpdateFounisseurSidebarComponent],
    exports: [FournisseurComplete],
    bootstrap: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CoreSidebarModule,
        DlDateTimeDateModule,
        DlDateTimePickerModule,
        NgxDatatableModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        RouterModule,
        
      ]
       
})
export class FournisseurCompleteModule {}
