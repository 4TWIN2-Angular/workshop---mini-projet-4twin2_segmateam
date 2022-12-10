import { Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
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

 

 
   getAllProd() {
    
    this._ecommerceService.getProducts().subscribe((data) => {
      this.products = data
      this._ecommerceService.productList = data;
    });
    
  }
  ngOnInit() {
    this.getAllProd();
    this._ecommerceService.refrD$.subscribe(()=>{
      this._ecommerceService.getProducts().subscribe((data) => {
        this.products = data
     
      
      })




    })
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
            link: '/produit/home'
          },
          {
            name: 'Produits',
            isLink: false
          }
        ]
      }
    };
  }


  listView() {
    this.gridViewRef = false;
  }

  gridView() {
    this.gridViewRef = true;
  }

}
