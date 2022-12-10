import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { FournisseurService } from "../fournisseur.service";
import { FournisseurComplete } from "../List-fournisseur/FournisseurComplete";


@Component({
    selector: "app-new-founisseur-sidebar",
    templateUrl: "new-fournisseur.html",
  })
    export class NewFounisseurSidebarComponent implements OnInit {
      latitude!: number;
      longitude!: number;
      FournisseurForm = new FormGroup({
        codeFournisseur: new FormControl('', [Validators.required,Validators.pattern('^[A-Z]{3}[0-9]{3}')]),
        libelleFournisseur: new FormControl('', [Validators.required]),
        categorieFournisseur: new FormControl('', [Validators.required]),
        addresse: new FormControl(''),
       
      });  
      DetailFournisseurFrom = new FormGroup({
        matricule : new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(8)]),
        dateDebutCollaboration :new FormControl(),
        fournisseur : new FormControl(''),
      })
      fournisseur :any
      test  = false
      df  :any
      @Output() newItemEvent = new EventEmitter<string>();

      
  @ViewChild('search')
  public searchElementRef!: ElementRef;
      public userLocationZoom = 15;
      public userLocationCenter: google.maps.LatLngLiteral;
     
 
        ngOnInit(): void {
          

        }
       
   /** Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService , private fournisseurService :FournisseurService ,private fc : FournisseurComplete ,private router: Router) {
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
 
  onSubmit(){

    this.FournisseurForm.get('addresse').setValue(this.latitude+" "+this.longitude)
  
    this.fournisseurService.AddFournisseur(this.FournisseurForm.value).subscribe(
      (data)=>{
       
        this.fournisseur = data ;
        console.log( this.fournisseur) ;
        this.test = true ;
      },
       
      (error)=>console.log(error)) 
      //add detail fournisseur
     
      



      //window.location.reload();
    
  }
  onSubmitDetail(){
    console.log("here")
    this.DetailFournisseurFrom.get('fournisseur').setValue(this.fournisseur)
    
    this.fournisseurService.AddAndAssigneDetailtoFronisseur(this.DetailFournisseurFrom.value).subscribe(
      (data)=>{
        data.fournisseur = this.fournisseur
        this.df = data ;
        console.log(data) ;
        this.fournisseurService.UpdateFournisseur(this.fournisseur).subscribe(
          (data)=>{
            data.detailFournisseur = this.df
            console.log(data)
            
          }
        )
      })
     
      
  } 
  
 
  
    }