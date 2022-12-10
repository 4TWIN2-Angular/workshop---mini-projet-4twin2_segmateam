import { DecimalPipe } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Observable, of, Subject } from "rxjs";
import { Fournisseur } from "../Fournisseur";
import { FournisseurService } from "../fournisseur.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { DFournisseur } from "../DFournisseur";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: "ngbd-Fournisseur-complete",
  templateUrl: "Fournisseur-complete.html",
  providers: [FournisseurService, DecimalPipe],
})
export class FournisseurComplete implements OnInit {
  Fournisseurs$: Fournisseur[] =[];
  total$: Observable<number>;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 2
  public SelectionType = SelectionType;
  SearchItem: string;
  page :number = 1;
  index : number 
  DetailF : DFournisseur
  test = false
  
  idF : number 
  liveSearch(Search:string):Observable<Fournisseur[]>{ 
    
    
    const fournisseurs = of (this.Fournisseurs$.filter(fournisseur=>(
    fournisseur.codeFournisseur.toUpperCase().includes(Search.toUpperCase()) || fournisseur.libelleFournisseur.toUpperCase().includes(Search.toUpperCase()))));
    console.log(fournisseurs);
    
    return fournisseurs
  }
  onKeyUp(event:any){
    this.SearchItem = event.target.value;
    if(this.SearchItem !=""){
    this.liveSearch(this.SearchItem).subscribe(
      (data)=>this.Fournisseurs$ = data ,
      (error)=>console.log(error)
    )
   }else{
    this.getAllFournisseurs()
   }
  }

      

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  private _unsubscribeAll: Subject<any>;
  constructor(
    public service: FournisseurService,
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal
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
  toggleSidebarUpdate(name,id): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.idF = id
    console.log(this.idF)
  }
  
  ngOnInit(): void {
    this.getAllFournisseurs();
    
    console.log(this.Fournisseurs$)
    
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

  }
  getAllFournisseurs() {
    this.service.GetAllFournisseurs().subscribe((data) => {
      this.Fournisseurs$ =data ;
      console.log( this.Fournisseurs$);
    });
   
    
  }
  addItem(newItem: Fournisseur) {
    this.Fournisseurs$.push(newItem)
   // console.log(this.Fournisseurs$)
  }
  onPageChange(pageData: number) {
    console.log('pageData', pageData);
    this.page = pageData;
    

    this.service.GetAllFournisseurs().subscribe((data) => {
      this.Fournisseurs$ = data ;
      console.log('current page', this.page);
      
      
    });
  }
  //delete fourniiseur
  deleteFournisseur(id: number) {
    this.service.DeleteFournisseur(id).subscribe((data) => {
      this.getAllFournisseurs();
    });
  }
  toggleDetails() {
    if(this.DetailF == undefined){
      this.test = false
    }else{
      this.test = !this.test;
      console.log(this.test);
    }
    
  }
  //get details fournisseur
  getDetailsFournisseur(id: number) {
    this.service.get(id).subscribe((data) => {
      this.DetailF = data;
      console.log(this.DetailF);
    },
    (error)=>(console.log(error)));
  }
  
  modalOpenForm(modalForm){
    this.modalService.open(modalForm);
  }

}
