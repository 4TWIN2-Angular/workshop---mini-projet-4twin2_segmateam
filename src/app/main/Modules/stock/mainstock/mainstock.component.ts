import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { Stock } from './Stock';
import {Produit} from './Produit'
import { ModalComponent } from '../modal/modal.component';  
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from '../modal/modal-add/modal-add.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ModalEditComponent } from '../modal/modal-edit/modal-edit.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-mainstock',
  templateUrl: './mainstock.component.html',
  styleUrls: ['./mainstock.component.scss']
})
export class MainstockComponent implements OnInit {
  
  STOCKs : Stock[]
  Prods : Produit[] 
  stockAdd : Stock
  stockEdit : Stock
  public val!:any;
  SearchItem: string;
  constructor(private modalService: NgbModal,
    public service : StockService ,public router: Router ) { 
    // this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

   this.service.refresh$.subscribe(()=>
   {
     this.getAllStock();
   });
   this.getAllStock();
 }
   
getAllStock(){
  this.service.getAllStock().subscribe((data) => {
    this.STOCKs = data;
    console.log(this.STOCKs);
  }
  )
}
getSelectedStock(id : number){
  this.service.GetStockById(id).subscribe((data) => {
    this.stockEdit = data;
    console.log(this.stockEdit);
  }
  )
}

getAllProduitsByStock(id : number){
  this.service.getAllProduits(id).subscribe((data) => {
    this.Prods = data;
    this.service.stockSearch = data ; 
    console.log(this.Prods);
  })} 

  openScrollableContent(id : number) {
    this.service.getAllProduits(id).subscribe((data) => {
      this.Prods = data;
      console.log(this.Prods);
    })
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.produits = this.Prods;
	}
  openModalAdd() {
    const modalRef = this.modalService.open(ModalAddComponent);
    modalRef.componentInstance.produits = this.stockAdd;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    console.log(receivedEntry);
    })
    }

    openModalEdit(id : number) {
      this.service.GetStockById(id).subscribe((data) => {
        this.stockEdit = data;
        console.log(this.stockEdit);
        
       
      const modalRef = this.modalService.open(ModalEditComponent);
      console.log(this.stockEdit);
      modalRef.componentInstance.form = this.stockEdit;
      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      })
    })  
    }

    DeleteStock(id){
      this.service.deleteStock(id).subscribe((res)=>
      {
        Swal.fire('Stock supprimé!', 'Stock a été bien supprimé' ,'success');
      }
      )        
    }
    liveSearch(Search:string):Observable<Stock[]>{ 
    
    
      const stocks = of (this.STOCKs.filter(stock=>(
      stock.libelleStock.toUpperCase().includes(Search.toUpperCase()))));
      console.log(stocks);
      
      return stocks
    }

    onKeyUp(event:any){
      this.SearchItem = event.target.value;
      if(this.SearchItem !=""){
      this.liveSearch(this.SearchItem).subscribe(
        (data)=>this.STOCKs = data ,
        (error)=>console.log(error)
      )
     }else{
      this.getAllStock()
     }
    }

    filter(string :String){
      if(string == "EnStock"){
        this.service.GetEnStock().subscribe(
          (data)=>this.STOCKs = data 
        )
      }else if(string == "OutOfStock"){
        this.service.GetOutOfStock().subscribe(
          (data)=>this.STOCKs = data 
        )
      }else if(string == "POut"){
        this.service.GetPOutofStock().subscribe(
          (data)=>this.STOCKs = data 
        )
      }else if(string == "All"){
        this.service.getAllStock().subscribe(
          (data)=>this.STOCKs = data 
        )
      }
    }
  
    
        


    // liveSearch(){
    //   this.service.liveSearch(this.val,this.STOCKs).subscribe((data)=>{
    //     this.service.stockSearch=data;
    //     console.log("Test ya mounir",data);
        
    //   })
    // }

}
