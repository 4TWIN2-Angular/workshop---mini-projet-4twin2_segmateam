import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewRegSidebarComponent } from "app/main/Components/new-reglement/new-reglement-sidebar.component";
import { ReglementComponent } from "./reglement.component";

const routes: Routes = [
  {
    path: "reglement",
    component: ReglementComponent,
    children: [
      {
        path: "add-reglement",
        component: NewRegSidebarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementRoutingModule {}
