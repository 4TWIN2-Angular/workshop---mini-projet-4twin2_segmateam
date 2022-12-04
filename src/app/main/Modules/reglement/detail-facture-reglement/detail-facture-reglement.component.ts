import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Facture } from './Facture';

   
@Component({
  selector: 'app-detail-facture-reglement',
  templateUrl: './detail-facture-reglement.component.html',
  styleUrls: ['./detail-facture-reglement.component.scss']
})
export class DetailFactureReglementComponent implements OnInit {
@Input() toggle:Boolean;
@Input() facture:Facture
@Input() test:any
fact:Facture[];
  constructor() {
  }
  
  ngOnInit(): void {
    console.log("aaa",this.test);
    

  }

  

}
