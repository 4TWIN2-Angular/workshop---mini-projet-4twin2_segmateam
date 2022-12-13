import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/auth/service";
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
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
        // redirect to home if already logged in
    if (this._authenticationService.currentUserValue) {
      
    }else{this._router.navigate(['/pages/authentication/login-v2']);}
  }

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
