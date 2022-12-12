import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture';
import { FactureServiceService } from '../ServiceFacture/facture-service.service';

@Component({
  selector: 'app-update-facture',
  templateUrl: './update-facture.component.html',
  styleUrls: ['./update-facture.component.scss']
})
export class UpdateFactureComponent implements OnInit {
  myForm:FormGroup
  list : Facture[]
  newFact :Facture =new Facture
id:number
  constructor(private route:Router ,private fs:FactureServiceService,
    private ac:ActivatedRoute) { }

  ngOnInit(): void {

    this.createForm(new Facture());

    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('idFacture');
      if (this.id){
       
        //update
        this.fs.getFacture(this.id).subscribe(
          res=>{
          this.newFact=res,
           this.createForm(this.newFact)
           console.log(this.newFact)}
           )  }}
      )
      this.myForm.reset();
  }

 
  
  createForm(user:Facture){
    this.myForm=new FormGroup({
     
      montantRemise:new FormControl(user.montantRemise, Validators.required),
      montantFacture:new FormControl(user.montantFacture, Validators.required),
      dateCreationFacture:new FormControl(user.dateCreationFacture),
      dateDernierModification:new FormControl(user.dateDernierModification),
      archive:new FormControl(user.archive, Validators.required)

    })
  
  }

  saveUser(){
    this.newFact.montantRemise=  this.myForm.get('montantRemise').value;
    this.newFact.montantFacture=  this.myForm.get('montantFacture').value;
    this.newFact.dateCreationFacture=  this.myForm.get('dateCreationFacture').value;
    this.newFact.dateDernierModification=  this.myForm.get('dateDernierModification').value;
    this.newFact.archive=  this.myForm.get('archive').value;

  if (this.id){
    this.fs.updateFacture(this.newFact).subscribe();
    this.myForm.reset();
    this.route.navigate(['facture/table-facture'])
   }
}
}
