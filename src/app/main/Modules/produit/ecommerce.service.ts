import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { products } from './Model/Product';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService implements Resolve<any> {
  // Public
  public productList: Array<any>;
  public selectedProduct;
  public relatedProducts;
  public onProductListChange: BehaviorSubject<any>;
  public onSelectedProductChange: BehaviorSubject<any>;
  // Private
  private idHandel;

  private sortRef = key => (a, b) => {
    const fieldA = a[key];
    const fieldB = b[key];
    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return comparison;
  };
  private _refrD$ = new Subject ;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient ,private http: HttpClient) {
    this.onProductListChange = new BehaviorSubject({});
    this.onSelectedProductChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.idHandel = route.params.id;
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getProducts()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Products
   */
   getProducts(): Observable<products[]> {
    return this.http.get<products[]>('http://localhost:8090/Produit');
  }
  getProductsById(id:number): Observable<products[]> {
    return this.http.get<products[]>('http://localhost:8090/Produit/'+id.toString());
  }
  

  postData(data: any): Observable<any> {
    return this.http.post('http://localhost:8090/Produit', data).pipe(tap(()=>{  
    this._refrD$.next()
    }))

}

del(id: number){
  return this.http.delete('http://localhost:8090/Produit/'+id).pipe(tap(()=>{  
    this._refrD$.next()
    }))

}
updateData(data:any) {
  return this.http.put('http://localhost:8090/Produit/',data).pipe(tap(()=>{  
    this._refrD$.next()
    }))
}

get refrD$(){
  return this._refrD$
 }


/**
   * Sort Product
   *
   * @param sortBy
   */
 sortProduct(sortBy,list) {
  let sortDesc = false;

  const sortByKey = (() => {
    if (sortBy === 'price-desc') {
      sortDesc = true;
      return 'prix';
    }
    if (sortBy === 'price-asc') {
      return 'prix';
    }
    if (sortBy === 'featured') {
      return 'idProduit';
    }
  })();

  const sortedData = list.sort(this.sortRef(sortByKey));
  if (sortDesc) sortedData.reverse();
  list = sortedData;
  this.onProductListChange.next(list);
  return list ;
}
 isBigEnough(value) {
  return value >= 0;
}
filterProduct(arg, list){
  if(arg =="clear")  {  return list.sort(this.sortRef("idProduit")) }
  if(arg =="all")  {  return list.sort(this.sortRef("idProduit")) }
  if(arg =="lte100")  {  return list.filter(produit => produit.prix <= 100) }
  if(arg =="btn100-200") {return list.filter(produit => produit.prix > 100 && produit.prix <= 200)}
  if(arg =="bt200-500") {return list.filter(produit => produit.prix > 200 && produit.prix < 500)}
  if(arg =="gte500") {return list.filter(produit => produit.prix >= 500 )}
  if(arg =="old") {return list.sort(this.sortRef("dateCreation"))}
  if(arg =="new") {return list.sort(this.sortRef("dateCreation")).reverse()}
}

   }


  

 


 
  
