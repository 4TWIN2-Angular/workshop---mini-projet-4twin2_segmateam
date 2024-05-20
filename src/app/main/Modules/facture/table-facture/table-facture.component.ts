import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {Facture} from "../facture";
import {FactureServiceService} from "../ServiceFacture/facture-service.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Observable, Subject } from 'rxjs';
import { DetailFacture } from '../DetailFacture/detail-facture/DetailFacture';
import { DetailFactureComponent } from '../DetailFacture/detail-facture/detail-facture.component';
import { NgbdSortableHeader, SortEvent } from '../../reglement/table-reglement/sortable.directive';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AffiDetailFactureComponent } from '../DetailFacture/affi-detail-facture/affi-detail-facture.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-table-facture',
  templateUrl: './table-facture.component.html',
  styleUrls: ['./table-facture.component.scss']
})
export class TableFactureComponent implements OnInit {
  @ViewChild(AffiDetailFactureComponent) df : AffiDetailFactureComponent; 
  nb:number
  show : boolean = false;
  id:Number;
  DetailF:DetailFacture[]
  factures: Facture[]
  
  private _unsubscribeAll: Subject<any>;
  public editFacture: Facture;
  public deleteFacture: Facture; 
 //jdid
 total$: Observable<number>;
  editing: Observable<number>;
  editStatus: Boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ///jdiiid 
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  rows:any

  constructor(private _coreSidebarService: CoreSidebarService ,
    public fs: FactureServiceService, private router: Router) {
      this._unsubscribeAll = new Subject(); }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }




  ngOnInit(): void {
   
   this.getFactures(); 
    // this.fs.GetAllFactures().subscribe(data => {
    //   this.factures = data;
    //   console.log("facture" , this.factures)
    // });
  

  }

  public getFactures(): void {
    this.fs.GetAllFactures().subscribe((data )=> {
      this.fs.FACTURES = data 
  
    });
    this.total$ = this.fs.total$;
  }



  public onUpdateEmloyee(facture: Facture): void {
    this.fs.updateFacture(facture).subscribe(
        (response: Facture) => {
          console.log(response);
          this.getFactures();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  delete(f:Facture){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce reglement ?',
      text: 'Vous ne pourrez pas récupérer ce reglement',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, gardez-le'
    }).then((result) => {
      if (result.value) {
      this.fs.deleteFacture(f).subscribe((res)=>
      {
        Swal.fire(
          'Supprimé !',
          'Le reglement a été supprimé.',
          'success'
        )     }
       )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annulé',
              'La suppression a été bien annulée :)',
              'error'
            )
          }
        })
  
  }
 

  GoDetails(i: number) {  
    this.nb=i ;   
    this.show=true;
     this.df.affichage2(i);
  }



  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.fs.sortColumn = column;
    this.fs.sortDirection = direction;
  }
}
  // public onAddFacture(addForm: NgForm): void {
  //   document.getElementById('add-new-facture-form').click();

  //   this.fs.addFacture(addForm.value).subscribe(
  //       (response: Facture) => {
  //         console.log(response);
  //         this.getFactures();
  //         addForm.reset();
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //         addForm.reset();
  //       }
  //   );
  // }