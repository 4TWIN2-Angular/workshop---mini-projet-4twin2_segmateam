import { Component, Input, OnInit } from '@angular/core';
import { FactureServiceService } from '../../ServiceFacture/facture-service.service';
import { DetailFacture } from '../detail-facture/DetailFacture';

@Component({
  selector: 'app-affi-detail-facture',
  templateUrl: './affi-detail-facture.component.html',
  styleUrls: ['./affi-detail-facture.component.scss']
})
export class AffiDetailFactureComponent implements OnInit {
  DetailF:DetailFacture[]
  @Input() idF :number 
  constructor(private fs:FactureServiceService) { }

  ngOnInit(): void {
    this.affichage2(this.idF)
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
          this.DetailF=res}))
}



}
