import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReglementComponent } from "./main/reglement.component";
import { NgbdTableCompleteModule } from "app/main/Modules/reglement/table-reglement/table-complete.module";
import { ReglementRoutingModule } from "./reglement-routing.module";

@NgModule({
  declarations: [ReglementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReglementRoutingModule,
    NgbdTableCompleteModule
  ],
})
export class ReglementModule {}
