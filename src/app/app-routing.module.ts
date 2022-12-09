import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FournisseurModule } from "./main/Modules/fournisseur/fournisseur.module";
import { HomeComponent } from "./main/Modules/home/home.component";

const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "fournisseur",
    loadChildren: () =>
      import("./main/Modules/fournisseur/fournisseur.module").then(
        (m) => m.FournisseurModule
      ),
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },

  {
    path: "**",
    redirectTo: "/pages/miscellaneous/error", //Error 404 - Page not found
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
