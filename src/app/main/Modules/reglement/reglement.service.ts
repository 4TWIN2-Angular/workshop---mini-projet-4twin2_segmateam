/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { DateFormatter } from "utils/dateformat";
import { Reglement } from "./table-reglement/Reglement";
// import { COUNTRIES } from "./countries";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortColumn, SortDirection } from "./table-reglement/sortable.directive";
import Swal from 'sweetalert2/dist/sweetalert2.js';

interface SearchResult {
  reglements: Reglement[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  reglements: Reglement[],
  column: SortColumn,
  direction: string
): Reglement[] {
  if (direction === "" || column === "") {
    return reglements;
  } else {
    return reglements.sort((a, b) => {
      const res = compare(a[column].toString(), b[column].toString());
      return direction === "asc" ? res : -res;
    });
  }
}

// function matches(reglement: Reglement, term: String, pipe: PipeTransform) {
//   return (
//     reglement.montantPaye.includes(term) ||
//     pipe.transform(reglement.montantPaye).includes(term) ||
//     pipe.transform(reglement.montantRestant).includes(term)
//   );
// }

@Injectable({ providedIn: "root" })
export class ReglementService {
  REGLEMENTS = [];
  api: string = "http://localhost:9090";
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _reglements$ = new BehaviorSubject<Reglement[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._reglements$.next(result.reglements);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  GetAllReglements(): Observable<Reglement[]> {
    return this.http.get<Reglement[]>(this.api + "/reglement/all");
  }
  
  AddReglement(reglement:any){
    
    var datereg=reglement.date;
    datereg=DateFormatter.DateFromObject(datereg.year,datereg.month,datereg.day)
    reglement.date=datereg;
    console.log("DATE RECEIVED",reglement);
    return this.http.post<Reglement[]>(this.api+"/reglement/add",reglement).subscribe(data=>
      {
        Swal.fire('Reglement ajouté!', 'Le reglement a été bien ajouté', 'success')
        console.log(data)
  
      }
        
      
      
    )
    
  }
  DeleteReglement(reglement:any) {
    
    return this.http.delete<Reglement[]>(this.api +'/reglement/'+reglement).subscribe(data=>
      console.log(data)
      )
      

  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  GetReglementById(id: number) {
    return this.REGLEMENTS.find((reglement) => reglement.idReglement == id);
  }
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let reglements = sort(this.REGLEMENTS, sortColumn, sortDirection);

    // 2. filter
    // reglements = reglements.filter((reglement) =>
    //   matches(reglement, searchTerm, this.pipe)
    // );
    const total = reglements.length;

    console.log("trahh", total);
    console.log("page size", pageSize);
    console.log("reglement", reglements);

    return of({ reglements, total });
  }
}
