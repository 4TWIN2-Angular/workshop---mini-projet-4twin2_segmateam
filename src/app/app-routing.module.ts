import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./main/Modules/home/home.component";
import { ReglementModule } from "./main/Modules/reglement/reglement.module";

const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: 'produit', loadChildren: () =>
      import('./main/Modules/produit/produit.module').then(m => m.ProduitModule)
  }
  ,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
