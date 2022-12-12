import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Produit} from '../mainstock/Produit'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent  {
  @Input() produits : Produit[] ;

  constructor(public activeModal: NgbActiveModal) { }

  
}
