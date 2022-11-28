import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceShopComponent implements OnInit {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products ;
  public page = 1;
  public pageSize = 6;
  public searchText = '';
  
  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _ecommerceService: EcommerceService) {}
  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

 
   getAllProd() {
    this._ecommerceService.getProducts().subscribe((data) => {
      this.products = data
      this._ecommerceService.productList = data;
    });
    
  }
  ngOnInit(): void {
    this.getAllProd();
  
    this.contentHeader = {
      headerTitle: 'Liste Produit',
      actionButton:false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Produit',
            isLink: true,
            link: '/produit'
          },
          {
            name: 'Produits',
            isLink: false
          }
        ]
      }
    };
  }
}
