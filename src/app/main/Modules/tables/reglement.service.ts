/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { Reglement } from "./Reglement";
// import { COUNTRIES } from "./countries";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortColumn, SortDirection } from "./sortable.directive";

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
    //   } else {
    //     return reglements.sort((a, b) => {
    //       const res = compare(a[column], b[column]);
    //       return direction === "asc" ? res : -res;
    //     });
  }
}

// function matches(reglement: Reglement, term: string, pipe: PipeTransform) {
//   return (
//    reglement.montantPaye.includes(term.toLowerCase()) ||
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

    // 3. paginate
    reglements = reglements.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ reglements, total });
  }
}
