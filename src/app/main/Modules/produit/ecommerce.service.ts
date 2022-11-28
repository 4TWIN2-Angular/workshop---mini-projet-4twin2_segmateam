import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
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
   }


  /**
   * Sort Product
   *
   * @param sortBy
   */
 /*  sortProduct(sortBy) {
    let sortDesc = false;

    const sortByKey = (() => {
      if (sortBy === 'price-desc') {
        sortDesc = true;
        return 'price';
      }
      if (sortBy === 'price-asc') {
        return 'price';
      }
      sortDesc = true;
      return 'id';
    })();

    const sortedData = this.productList.sort(this.sortRef(sortByKey));
    if (sortDesc) sortedData.reverse();
    this.productList = sortedData;
    this.onProductListChange.next(this.productList);
  } */

 


 
  
