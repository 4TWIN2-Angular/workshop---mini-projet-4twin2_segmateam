
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../reglement/table-reglement/sortable.directive';
import { Produit } from './mainstock/Produit';
import { Stock } from './mainstock/Stock';



interface SearchResult {
  stocks: Stock[];
  totalqte: number;
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
  stocks: Stock[],
  column: SortColumn,
  direction: string
  
): Stock[] {
  if (direction === "" || column === "") {
    return stocks;
  } else {
    return stocks.sort((a, b) => {
      const res = compare(a[column].toString(), b[column].toString());
      return direction === "asc" ? res : -res;
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockSearch=[];
  STOCK = [] ; 
  PRODUITS = [] ; 
  stockFilter : Observable<Stock[]>; 
  api: string = environment.apiUrl;
  private _refresh$ = new Subject<void>();
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _stocks$ = new BehaviorSubject<Stock[]>([]);
  
  
  get refresh$(){
    return this._refresh$;
  }

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };



  constructor( private http: HttpClient) { 

    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._stocks$.next(result.stocks);
    
      });

      this._search$.next();
  }

  getAllProduits(id : number): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.api + "/stock/getProdByStock/"+id);
  }

  getAllStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.api + "/stock");
    
  }
  //Add stock 
  AddStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.api + "/stock", stock).pipe(
      tap(()=>{
        this._refresh$.next()
      }
      ));;
  }
  //Delete stock
  deleteStock(id: number): Observable<Stock> {
    return this.http.delete<Stock>(this.api + "/stock/" + id).pipe(
      tap(()=>{
        this._refresh$.next()
      }
      ));;
  }
//update stock 
  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(this.api + "/stock", stock).pipe(
      tap(()=>{
        this._refresh$.next()
      }
      ));
  }
  GetStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(this.api + "/stock/" + id);
  }

  GetEnStock():Observable<Stock[]>{
    return this.http.get<Stock[]>(this.api + "/stock/getStockByFilter");
  }

  GetOutOfStock():Observable<Stock[]>{
    return this.http.get<Stock[]>(this.api + "/stock/getStockByFilter0");
  }

  GetPOutofStock():Observable<Stock[]>{
    return this.http.get<Stock[]>(this.api + "/stock/getStockByFilterInf");
  }

  
  liveSearch(val: any,stk :Stock[]): Observable<Stock[]> {
  
    console.log(this.STOCK);
    console.log("val", val);
    
    const stock = of(
      stk.filter((st) =>
        (st.libelleStock.toString().includes(val.toString())))
      );
    return stock;
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let stocks = sort(this.STOCK, sortColumn, sortDirection);

    const totalqte = stocks.length;

    console.log("uu", totalqte);
    console.log("page size", pageSize);
    console.log("stock", stocks);

    return of({ stocks, totalqte });
  }



}

