import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { HomeComponent } from "./main/Modules/home/home.component";



const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "produit",
    loadChildren: () =>
      import("./main/Modules/produit/produit.module").then(
        (m) => m.ProduitModule
      ),
  },
  {
    path: "reglement",
    loadChildren: () =>
      import("./main/Modules/reglement/reglement.module").then(
        (m) => m.ReglementModule
      ),
  },
  
   {   
    path: "facture",
    loadChildren: () =>
        import("./main/Modules/facture/facture.module").then((m) => m.FactureModule),
  },{
    path: "fournisseur",
    loadChildren: () =>
      import("./main/Modules/fournisseur/fournisseur.module").then(
        (m) => m.FournisseurModule
      ),
  },
  {
    path: "produit",
    loadChildren: () =>
      import("./main/Modules/produit/produit.module").then(
        (m) => m.ProduitModule
      ),
  },
  {
    path: "reglement",
    loadChildren: () =>
      import("./main/Modules/reglement/reglement.module").then(
        (m) => m.ReglementModule
      ),
  },
  
   {   
    path: "facture",
    loadChildren: () =>
        import("./main/Modules/facture/facture.module").then((m) => m.FactureModule),
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