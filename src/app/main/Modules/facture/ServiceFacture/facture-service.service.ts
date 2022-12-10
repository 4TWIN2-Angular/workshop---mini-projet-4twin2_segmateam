import { Injectable } from '@angular/core';
import {Facture} from "../facture";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {DecimalPipe} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
import {DetailFacture} from "../DetailFacture/detail-facture/DetailFacture";
import {reflectTypeEntityToDeclaration} from "@angular/compiler-cli/src/ngtsc/reflection";

interface SearchResult {
  factures: Facture[];
  total: number;
}
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;

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

  // private _state: State = {
  //   page: 1,
  //   pageSize: 4,
  //   // searchTerm: "",
  //   // sortColumn: "",
  //   // sortDirection: "",
  // };
  constructor(private http:HttpClient) {

  }

public  findByFacture(id:number):Observable<DetailFacture[]>{
    return this.http.get<DetailFacture[]>(this.urlDetailF+"/"+id);
}


  public GetAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.api+"/all");
  }

  deleteDetailF(dF:DetailFacture):Observable<DetailFacture>{
    console.log("detail user");
    return this.http.delete<DetailFacture>(
        this.urlDetailF+"/"+dF.idDetailFacture); }

  // /---------------- Facture
  deleteFacture(facture:Facture):Observable<Facture>{
    console.log("delete user");
    return this.http.delete<Facture>( this.api+"/"+facture.idFacture);
  }

  addFacture(facture:Facture):Observable<Facture>{

    return this.http.post<Facture>(this.api+"/add",facture);
    console.log("service appelé");
  }



  updateFacture(facture:Facture):Observable<Facture>{

    return this.http.put<Facture>(this.api+"/"+facture.idFacture,facture);
    console.log("update user");
  }

  getFacture(id:number):Observable<Facture>{

    return this.http.get<Facture>(this.api+"/"+id);
    console.log("get user");
  }













}
