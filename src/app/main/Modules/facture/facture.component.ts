import { Component, OnInit } from '@angular/core';
import {FactureServiceService} from "./ServiceFacture/facture-service.service";
import {Facture} from "./facture";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
  providers: [FactureServiceService],

})
export class FactureComponent implements OnInit {
  factures:Facture[]
  show :boolean = false
  constructor(private fs:FactureServiceService,private route:Router) { }

  ngOnInit(): void {
  
  }
go(){
  this.show=true
this.route.navigate(['facture/table-facture'])
}

}
