import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditRegSidebarComponent } from "./edit-reglement/edit-reglement-sidebar.component";
import { ReglementComponent } from "./main/reglement.component";
import { NewRegSidebarComponent } from "./new-reglement/new-reglement-sidebar.component";

const routes: Routes = [
  {
    path: '',
    component: ReglementComponent,
    children: [
      {
        path: "add-reglement",
        component: NewRegSidebarComponent,
      },
      {
        path: "edit-reglement/:id",
        component: EditRegSidebarComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ReglementRoutingModule {}
