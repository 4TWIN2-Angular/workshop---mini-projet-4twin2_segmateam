import { DecimalPipe } from "@angular/common";
import {
  Component,
  Inject,
  Input,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Observable, Subject } from "rxjs";
import { Reglement } from "./Reglement";
import { ReglementService } from "../reglement.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: "ngbd-table-complete",
  templateUrl: "./table-complete.html",
  providers: [ReglementService, DecimalPipe],
})
export class NgbdTableComplete {
  reglements$: Reglement[];
  total$: Observable<number>;
  editing: Observable<number>;
  editStatus: Boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  private _unsubscribeAll: Subject<any>;
  constructor(
    public service: ReglementService,
    private _coreSidebarService: CoreSidebarService
  ) {
    this._unsubscribeAll = new Subject();
  }
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  GetReglement(id: Observable<number>) {
    this.editing = id;
    this.editStatus = true;
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  getAllReglements() {
    this.service.GetAllReglements().subscribe((data) => {
      this.service.REGLEMENTS = data;
    });
    this.total$ = this.service.total$;
  }
  DeleteReglement(id){
    this.service.DeleteReglement(id).subscribe((res)=>
    {
      Swal.fire('Reglement supprimé!', 'Le reglement a été bien supprimé' ,'success');
    }
    )

      
  }
  ngOnInit(): void {
    this.service.refresh$.subscribe(()=>
    {
      this.getAllReglements();
    });
    this.getAllReglements();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
