import { DecimalPipe } from "@angular/common";
import { Component, Inject, QueryList, ViewChildren } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Observable, Subject } from "rxjs";
import { Reglement } from "./Reglement";
import { ReglementService } from "./reglement.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

@Component({
  selector: "ngbd-table-complete",
  templateUrl: "./table-complete.html",
  providers: [ReglementService, DecimalPipe],
})
export class NgbdTableComplete {
  reglements$: Reglement[];
  total$: Observable<number>;

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
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  getAllReglements() {
    this.service.GetAllReglements().subscribe((data) => {
      this.reglements$ = data;
      this.service.REGLEMENTS = data;
      console.log("aaaaaaa", this.reglements$);
    });
    this.total$ = this.service.total$;
  }
  ngOnInit(): void {
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
