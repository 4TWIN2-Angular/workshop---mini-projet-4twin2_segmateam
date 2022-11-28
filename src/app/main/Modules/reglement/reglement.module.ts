import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReglementRoutingModule } from "./reglement-routing.module";
import { ReglementComponent } from "./reglement.component";
import { NgbdTableCompleteModule } from "app/main/Components/tables/table-complete.module";

@NgModule({
  declarations: [ReglementComponent],
  imports: [CommonModule, ReglementRoutingModule, NgbdTableCompleteModule],
})
export class ReglementModule {}
