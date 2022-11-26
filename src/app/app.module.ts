import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr"; // For auth after login toast

import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";

import { coreConfig } from "app/app-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { ContentHeaderModule } from "./layout/components/content-header/content-header.module";
import { HomeComponent } from "./main/Modules/home/home.component";
import { ReglementModule } from "./main/Modules/reglement/reglement.module";
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";
import { NewRegSidebarComponent } from "./main/Components/new-reglement/new-reglement-sidebar.component";

const appRoutes: Routes = [];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CommonModule,
    ContentHeaderModule,
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    AppRoutingModule,
    // App modules
    LayoutModule,
  ],

  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class AppModule {}
