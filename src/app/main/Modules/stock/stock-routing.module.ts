import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddstockComponent } from './addstock/addstock.component';
import { MainstockComponent } from './mainstock/mainstock.component';

const routes: Routes = [
  {path: '', component: MainstockComponent ,
  children:[
    {path: 'add', component: AddstockComponent},]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
