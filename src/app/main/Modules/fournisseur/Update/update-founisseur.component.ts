import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { validateBasis } from "@angular/flex-layout";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { DFournisseur } from "../DFournisseur";
import { Fournisseur } from "../Fournisseur";
import { FournisseurService } from "../fournisseur.service";
import { FournisseurComplete } from "../List-fournisseur/FournisseurComplete";

@Component({
    selector: "app-update-founisseur-sidebar",
    templateUrl: "update-fournisseur.html",
  })
    export class UpdateFounisseurSidebarComponent  {
  DetailF: DFournisseur;
      ngOnChanges(){ 
        if(this.idFournisseur != undefined){
          console.log(this.idFournisseur);
          this.GetFournisseur(this.idFournisseur);
          this.getDetailsFournisseur(this.idFournisseur);
        }
        
      }
    ngOnInit(): void {
      if(this.idFournisseur == undefined){
        this.form = {
          idFournisseur : 0,
          codeFournisseur : "",
          libelleFournisseur : "",
          categorieFournisseur : "",
          addresse : "",
          detailFournisseur : null
        }
        this.dform = {
          matricule  :"",
          dateDebutCollaboration : "",
        }
      }
    }
    @Input() idFournisseur : number;
    form : any ;
    dform: any ;
    latitude!: number;
    longitude!: number;
    test :  boolean
    

    /** Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
    constructor(private _coreSidebarService: CoreSidebarService , 
      private fournisseurService :FournisseurService ,private fc : FournisseurComplete ,
      private router: Router
      ) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocationCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            
          };
          this.latitude =this.userLocationCenter.lat ;
          this.longitude = this.userLocationCenter.lng;
          
        });
    }
    

     /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.fc.getAllFournisseurs();
  
  }
    onMapClicked(event: any){
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    }

      @ViewChild('search')
      public searchElementRef!: ElementRef;
      public userLocationZoom = 15;
      public userLocationCenter: google.maps.LatLngLiteral;

      GetFournisseur(id : number){
        
        this.fournisseurService.getFournisseur(id).subscribe(
          (data)=>{
            this.form = data ;
            console.log(this.form);
          })
      }
      onSubmit(){
        this.test = true;
        this.form.detailFournisseur = this.dform;
        this.fournisseurService.UpdateFournisseur(this.form).subscribe(
          (data)=>{
            data.detailFournisseur = this.dform;
            console.log(this.form);
          })
          console.log(this.form);
      }
      onSubmitDetail(){
        console.log(this.dform);
        this.fournisseurService.updateDetailFournisseur(this.dform).subscribe(
          (data)=>{
           
            console.log(data);
          }
        )
      }
      getDetailsFournisseur(id: number) {
        this.fournisseurService.get(id).subscribe((data) => {
          this.dform = data;
          console.log(data);
        },
        (error)=>(console.log(error)));
      }
    }