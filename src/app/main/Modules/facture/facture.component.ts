import { Component, OnInit } from '@angular/core';
import {FactureServiceService} from "./ServiceFacture/facture-service.service";
import {Facture} from "./facture";
import {Router} from "@angular/router";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
  providers: [FactureServiceService],

})
export class FactureComponent implements OnInit {
  factures:Facture[]
  constructor(private fs:FactureServiceService) { }

  ngOnInit(): void {
    this.fs.GetAllFactures().subscribe(data =>{
      this.factures=data
      console.log(this.factures)
    });
  }


}
