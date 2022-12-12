import { Component, OnInit } from '@angular/core';
import {FactureServiceService} from "./ServiceFacture/facture-service.service";
import {Facture} from "./facture";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  factures:Facture[]
  constructor(private fs:FactureServiceService) { }

  ngOnInit(): void {
  
  }


}
