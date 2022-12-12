import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from '../../mainstock/Stock';
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { StockService } from '../../stock.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent  {
  Sform = new FormGroup({
    libelleStock: new FormControl("",[
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(5)
   
    ]),
    qte: new FormControl("",[  
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    
    qteMin: new FormControl("",[
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(2),
      Validators.pattern("^[0-9]*$")
    ]
      
      
    ),
  });
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  
  @Input() stock : Stock
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  passBack() {
    this.passEntry.emit(this.stock);
    }

  constructor(public activeModal: NgbActiveModal,private _coreSidebarService: CoreSidebarService,private service : StockService) { }

 /**
   * Toggle the sidebar
   *
   * @param name
   */
 toggleSidebar(name): void {
  this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
}

AddStock() {
  console.log("form updated",this.Sform.value);
  this.service.AddStock(this.Sform.value).subscribe((result)=>{
  
    Swal.fire('Stock ajouté!', 'Stock a été bien ajouté', 'success');
  })
}
/**
   * Submit
   *
   * @param form
   */
submit(form) {
  if (form.valid) {
  }
  this.toggleSidebar("modal-add");
    form.reset();
    window.location.reload();


}

}
