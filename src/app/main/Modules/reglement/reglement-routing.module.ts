import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReglementComponent } from "./reglement.component";

const routes: Routes = [
  {
    path: "reglement",
    component: ReglementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementRoutingModule {}
