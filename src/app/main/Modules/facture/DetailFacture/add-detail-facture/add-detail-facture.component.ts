import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureServiceService } from '../../ServiceFacture/facture-service.service';
import { DetailFacture } from '../detail-facture/DetailFacture';

@Component({
  selector: 'app-add-detail-facture',
  templateUrl: './add-detail-facture.component.html',
  styleUrls: ['./add-detail-facture.component.scss']
})
export class AddDetailFactureComponent implements OnInit {
  id:number
  DetailF:DetailFacture[]
  regform = new FormGroup ({
   
    qteCommande : new FormControl("",[  
      Validators.required,
     Validators.pattern("^[0-9]*$")
    ]) ,
    prixTotalDetail : new FormControl("",[  
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    pourcentageRemise : new FormControl("",[  Validators.required,
      Validators.pattern("^[0-9]*$") ] ),
     
    montantRemise :  new FormControl("", [Validators.required,
    Validators.pattern("^[0-9]*$")] ),
   
  });



  constructor(private fs:FactureServiceService, private ac:ActivatedRoute,private route :ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.ac.paramMap.subscribe(params=>{
      this.id=+params.get('idF'); })
      
    this.fs.getDetailsFacture(this.id).subscribe(
      res=>{console.log(res);
          this.DetailF=res});


  }



  submit(form )  : void {

    if (form.valid) {
     
      form.reset();
    }

  }

  addDetailFacture(){
    console.log("Detail Facture" , this.regform.value);
    
   this.fs.addDetailFacture(this.id ,this.regform.value).subscribe(()=>
   this.fs.getDetailsFacture(this.id).subscribe(
     res=>{console.log(res);
         this.DetailF=res}))
  }
  deleteDF(i:number ){
  
    this.fs.deleteDetailF(this.DetailF[i]).subscribe(()=>
    this.fs.getDetailsFacture(this.id).subscribe(
      res=>{console.log(res);
          this.DetailF=res}))
}
}
