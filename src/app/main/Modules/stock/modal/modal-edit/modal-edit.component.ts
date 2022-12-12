import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { ActivatedRoute } from "@angular/router";
import { StockService } from '../../stock.service';
import { Location } from "@angular/common";
import { Stock } from '../../mainstock/Stock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
 

  

  @Input() stockUp : any ;
   id : any 
   form : any
   @Output() passEntry: EventEmitter<any> = new EventEmitter()


  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */


  
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public service : StockService , 
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  backClicked() {
    this._location.back();
  }
  passBack() {
    this.passEntry.emit(this.form);
    }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  /**
   * Submit
   *
   * @param form
   */

  submit(form) {
    if (form.valid) {
      this.toggleSidebar("modal-edit");
    }
    this.EditStock();
    console.warn(form.value);
  }
 GetStockById(id : number) {
  this.service.GetStockById(id).subscribe(
    (data) => { 
      this.form = data ; 
      console.log(this.form);  });
}

OnSubmit(){
  this.service.updateStock(this.form).subscribe(
    (data) => {
      Swal.fire('Stock ajouté!', 'Stock a été bien ajouté', 'success');});
}

//Edit Stock 
EditStock(){
  this.service.updateStock(this.form).subscribe();
} 


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.GetStockById(this.id);
      console.log(this.stockUp);
    });
  }

}
