import { Component, Input } from "@angular/core";
import { DFournisseur } from "../../DFournisseur";

@Component({
    selector: 'app-F-details',
    templateUrl: 'RowDetails.html',
})
export class RowComponent{
    @Input() dfournisseur : any
    constructor(){
       
    }
}