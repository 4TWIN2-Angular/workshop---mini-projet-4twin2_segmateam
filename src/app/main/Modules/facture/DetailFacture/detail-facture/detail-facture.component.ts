import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FactureServiceService} from "../../ServiceFacture/facture-service.service";
import {DetailFacture} from "./DetailFacture";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.scss']
})
export class DetailFactureComponent implements OnInit {
id
  DetailF : DetailFacture[]
  constructor(private ac:ActivatedRoute,private fs:FactureServiceService) { }

  ngOnInit(): void {
    this.id = this.ac.snapshot.paramMap.get('idFacture')
    this.fs.findByFacture(this.id).subscribe(data =>{
      this.DetailF = data
      console.log(this.DetailF)
    })}

  deleteDF(i:number ){
    this.fs.deleteDetailF(this.DetailF[i]).subscribe()
    // (() => this.fs.findByFacture(id).subscribe(res=>
    // this.DetailF=res) );
}


}
