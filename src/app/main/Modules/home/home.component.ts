import { Component, OnInit } from "@angular/core";
import { FactureServiceService } from "../facture/ServiceFacture/facture-service.service";
import { EcommerceService } from "../produit/ecommerce.service";
import { ReglementService } from "../reglement/reglement.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  constructor(
 
  ) {}

  public contentHeader: object;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
 
  ngOnInit() {
    
    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
        ],
      },
    };
  }
}
