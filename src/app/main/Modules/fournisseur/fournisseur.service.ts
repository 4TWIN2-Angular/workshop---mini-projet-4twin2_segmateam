/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, from, Observable, of, Subject } from "rxjs";

import { Fournisseur } from "./Fournisseur";
import {DFournisseur} from "./DFournisseur"
// import { COUNTRIES } from "./countries";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortColumn, SortDirection } from "./List-fournisseur/sortable.directive";
import { environment } from "environments/environment";





@Injectable({ providedIn: "root" })
export class FournisseurService {
  FOURNISSEUR : Fournisseur[] ;
  api = environment.apiUrl


 
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _Fournisseurs$ = new BehaviorSubject<Fournisseur[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  

  constructor( private http: HttpClient) {
  
  }
  GetAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.api + "/fournisseur/all");
  }
  //each 4 fournissuer par page dans tableau 
  get Fournisseurs$() {
    return this._Fournisseurs$.asObservable();
  }
  
  AddFournisseur(Fournisseur : any )  :Observable<Fournisseur>{
    return this.http.post<Fournisseur>(this.api + "/fournisseur/add",Fournisseur);
  }
  DeleteFournisseur(id : any ) : Observable<Fournisseur>{
    return this.http.delete<Fournisseur>(this.api + "/fournisseur/delete/"+id);
  }
  UpdateFournisseur( Fournisseur : any ) : Observable<Fournisseur>{
    return this.http.put<Fournisseur>(this.api + "/fournisseur/update",Fournisseur);
  }

  AddAndAssigneDetailtoFronisseur(DFrournisseur : any ):Observable<DFournisseur>{
    return this.http.post<DFournisseur>(this.api +"/DetailsFournisseur/add",DFrournisseur);
  }

  get(id :any): Observable<DFournisseur> {
    return this.http.get<DFournisseur>(this.api+"/DetailsFournisseur/DF/"+id);
  }
  getFournisseur(id :any): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(this.api+"/fournisseur/"+id);
  }
  
  updateDetailFournisseur(DFournisseur :any) : Observable<DFournisseur>{
    return this.http.put<DFournisseur>(this.api+"/DetailsFournisseur/update",DFournisseur);
  }
}
    
    

