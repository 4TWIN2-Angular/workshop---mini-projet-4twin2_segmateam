import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureServiceService } from '../../ServiceFacture/facture-service.service';
import { DetailFacture } from '../detail-facture/DetailFacture';

@Component({
  selector: 'app-update-detail-facture',
  templateUrl: './update-detail-facture.component.html',
  styleUrls: ['./update-detail-facture.component.scss']
})
export class UpdateDetailFactureComponent implements OnInit {
   id :number
   idFacture:any
   detFacture : DetailFacture = new DetailFacture();
  list : DetailFacture[]=[]
  myForm:FormGroup
  constructor(private route:Router ,private fs:FactureServiceService,private ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm(new DetailFacture());

    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('idDetailFacture');
      if (this.id){
        //update
        this.fs.getDetailF(this.id).subscribe(
          res=>{
          this.detFacture=res,
           this.createForm(this.detFacture)
           console.log(this.detFacture)}
           )  }}
      )
      this.myForm.reset();
      console.log("idFacture :",this.id)
      this.fs.idFacture(this.id).subscribe(
       res=> {this.idFacture=res}
      ) 
  }



  createForm(user:DetailFacture){
    this.myForm=new FormGroup({
     
        qteCommande:new FormControl(user.qteCommande, Validators.required),
        prixTotalDetail:new FormControl(user.prixTotalDetail, Validators.required),
        pourcentageRemise:new FormControl(user.pourcentageRemise,[Validators.required]),
        montantRemise:new FormControl(user.montantRemise)

    })
  }
  saveUser(){
    this.detFacture.qteCommande=  this.myForm.get('qteCommande').value;
    this.detFacture.prixTotalDetail=  this.myForm.get('prixTotalDetail').value;
    this.detFacture.pourcentageRemise=  this.myForm.get('pourcentageRemise').value;
    this.detFacture.montantRemise=  this.myForm.get('montantRemise').value;


 if (this.id){
  this.fs.updateDetailFacture(this.detFacture).subscribe();
  this.myForm.reset();
  this.route.navigate(['/facture/addDetailFac',this.idFacture])
 }
//  else{
//   this.fs.add(this.detFacture).subscribe();
//  }

 
  }
}

 
 
