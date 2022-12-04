import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitRoutingModule } from './produit-routing.module';
import { FormProduitComponent } from './form-produit/form-produit.component';
import { MainProduitComponent } from './main-produit/main-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { EcommerceShopComponent } from './ecommerce-shop/ecommerce-shop.component';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { EcommerceSidebarComponent } from './ecommerce-shop/sidebar/sidebar.component';
import { EcommerceItemComponent } from './produit-item/ecommerce-item.component';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { ReactiveFormsModule } from '@angular/forms';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};
@NgModule({
  declarations: [
    
   
    FormProduitComponent,
    MainProduitComponent,
    DetailsProduitComponent,
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceItemComponent,
    ListProduitComponent,
    ModifierProduitComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})

export class ProduitModule { }
