import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FactureServiceService} from "../../ServiceFacture/facture-service.service";
import {DetailFacture} from "./DetailFacture";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.scss']
})
export class DetailFactureComponent implements OnInit {
idd:number
@Input() idF :number 

  DetailF : DetailFacture[]
  constructor(private ac:ActivatedRoute,private fs:FactureServiceService , private route :Router) { }

  ngOnInit(): void {
    // this.id = this.ac.snapshot.paramMap.get('idFacture')
    // this.fs.findByFacture(this.id).subscribe(data =>{
    //   this.DetailF = data
    //   console.log(this.DetailF)
    // })



  }


  affichage2(i){
  console.log("test");
  this.fs.getDetailsFacture(i).subscribe(
    res=>{console.log(res);
        this.DetailF=res});
        
}




  deleteDF(i:number ){
  
    this.fs.deleteDetailF(this.DetailF[i]).subscribe(()=>
    this.fs.getDetailsFacture(this.idF).subscribe(
      res=>{console.log(res);
          this.DetailF=res})

    )

}


}
