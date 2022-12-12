import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CoreSidebarModule } from "@core/components";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { NgbdSortableHeader } from "./sortable.directive";
import { NgbdTableComplete } from "./table-complete";
import {
  DlDateTimeDateModule,
  DlDateTimePickerModule,
} from "angular-bootstrap-datetimepicker";
import { NewRegSidebarComponent } from "../new-reglement/new-reglement-sidebar.component";
import { EditRegSidebarComponent } from "../edit-reglement/edit-reglement-sidebar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CoreSidebarModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    RouterModule,
  ],
  declarations: [
    NgbdTableComplete,
    NgbdSortableHeader,
    NewRegSidebarComponent,
    EditRegSidebarComponent,
  ],
  exports: [NgbdTableComplete],
  bootstrap: [],
})
export class NgbdTableCompleteModule {}
