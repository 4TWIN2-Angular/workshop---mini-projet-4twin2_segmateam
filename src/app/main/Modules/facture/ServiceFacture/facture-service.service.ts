import { Injectable } from '@angular/core';
import {Facture} from "../facture";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {DatePipe, DecimalPipe} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
import {DetailFacture} from "../DetailFacture/detail-facture/DetailFacture";
import { SortColumn, SortDirection } from '../../reglement/table-reglement/sortable.directive';
import moment from 'moment';
import { DateFormatter } from 'utils/dateformat';

interface SearchResult {
  factures: Facture[];
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
  factures : Facture[],
  column: SortColumn,
  direction: string
): Facture[] {
  if (direction === "" || column === "") {
    return factures;
  } else {
    return factures.sort((a, b) => {
      const res = compare(a[column].toString(), b[column].toString());
      return direction === "asc" ? res : -res;
    });
  }
}
// const compare = (v1: string | number, v2: string | number) =>
//     v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
// function sort(
//     factures: Facture[],
//     // column: SortColumn,
//     direction: string
// ): Facture[] {
//   if (direction === "" || column === "") {
//     return factures;
//   } else {
//     return factures.sort((a, b) => {
//       const res = compare(a[column].toString(), b[column].toString());
//       return direction === "asc" ? res : -res;
//     });
//   }
// }


@Injectable({
  providedIn: 'root'
})
export class FactureServiceService {
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
  }
  api: string = "http://localhost:9090/facture";
  newUrl : string
  urlDetailF: string = "http://localhost:9090/DetailFac";
  FACTURES = [];
  // httpOptions = { headers: new HttpHeaders({
  //     'Content-Type': 'application/json'})}

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _factures$ = new BehaviorSubject<Facture[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _refresh$=new Subject<void>()

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  getDetailsFacture(id:number):Observable<DetailFacture[]>{
    return this.http.get<DetailFacture[]>(this.urlDetailF+"/All/"+id,this.httpOptions);
  }


  constructor(private http:HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._factures$.next(result.factures);
        this._total$.next(result.total);
      });

    this._search$.next();

  }
  updateDetailFacture(detailFacture:DetailFacture):Observable<DetailFacture>{

  return this.http.put<DetailFacture>(this.urlDetailF,detailFacture,this.httpOptions);
    console.log("update Detail facture")
  }
  updateFacture(facture:Facture):Observable<Facture>{

    return this.http.put<Facture>(this.api,facture,this.httpOptions);
    console.log("update facture")
  }

public getDetailF(id:number): Observable<DetailFacture>{
  return this.http.get<DetailFacture>(this.urlDetailF+"/"+id,this.httpOptions)
}

public GetAllDetailFactures(): Observable<DetailFacture[]> {
  return this.http.get<DetailFacture[]>(this.urlDetailF,this.httpOptions);
}
  public GetAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.api+"/all",this.httpOptions);
  }
  public idFacture(id:number):Observable<DetailFacture>{
    return this.http.get<DetailFacture>(this.urlDetailF+"/idF/"+id,this.httpOptions)
  }

  public deleteDetailF(dF:DetailFacture):Observable<DetailFacture>{
    console.log("detail Facture user");
    return this.http.delete<DetailFacture>(this.urlDetailF+`/del,{body:dF }`,this.httpOptions );
  //  return this._http.delete(this.PATH_OF_API + `/delete/${userName}`,this.httpOptions); 
  }

  // /---------------- Facture
  deleteFacture(facture:Facture):Observable<Facture>{
    console.log("delete user");
    return this.http.delete<Facture>( this.api+"/"+facture.idFacture,this.httpOptions);
  }

  addFacture(facture:any):Observable<Facture>{
   
    var datereg=facture.dateCreationFacture;
    datereg=DateFormatter.DateFromObject(datereg.year,datereg.month,datereg.day);
    facture.dateCreationFacture=datereg ;

    var dateD=facture.dateDernierModification;
    dateD=DateFormatter.DateFromObject(dateD.year,dateD.month,dateD.day);
    facture.dateDernierModification=dateD ;

    return this.http.post<Facture>(this.api+"/add",facture,this.httpOptions);
    console.log("facture ajoutee");
  }
  // addDetailFacture(detailFacture:DetailFacture):Observable<DetailFacture>{

  //   return this.http.post<DetailFacture>(this.urlDetailF+"/add",detailFacture);
  //   console.log("DetailFacture ajoutee");
  // }

  addDetailFacture(id:number,detailFacture:DetailFacture):Observable<DetailFacture>{

    return this.http.post<DetailFacture>(this.urlDetailF+"/add/"+id,detailFacture,this.httpOptions);
    console.log("DetailFacture ajoutee");
  }


  getFacture(id:number):Observable<Facture>{

    return this.http.get<Facture>(this.api+"/"+id,this.httpOptions);
    console.log("get facture");
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

 
    let factures = sort(this.FACTURES, sortColumn, sortDirection);

  
    const total = factures.length;

    
    console.log(" size", pageSize);
    console.log("facture", factures);

    return of({ factures , total });
  }
  
}