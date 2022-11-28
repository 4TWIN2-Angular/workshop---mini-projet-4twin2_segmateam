import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormControl } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReglementRoutingModule } from "./main/reglement-routing.module";
import { ReglementComponent } from "./reglement.component";
import { NgbdTableCompleteModule } from "app/main/Modules/reglement/table-reglement/table-complete.module";

@NgModule({
  declarations: [ReglementComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReglementRoutingModule,
    NgbdTableCompleteModule,
  ],
})
export class ReglementModule {}
