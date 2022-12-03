import { Component, Input, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Form, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ReglementService } from "../reglement.service";
import { DateFormatter } from "utils/dateformat";

@Component({
  selector: "edit-new-reglement-sidebar",
  templateUrl: "./edit-reglement-sidebar.component.html",
  styleUrls: ["./edit-reglement-sidebar..component.scss"],
})
export class EditRegSidebarComponent implements OnInit {
  reglement: any;
  
  datereg:any;
  id: any;
  payee=false;

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public service: ReglementService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}
  backClicked() {
    this._location.back();
  }
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.toggleSidebar("edit-reglement-sidebar");
    }
    this.EditReglement();
    console.warn(form.value);
  }
  GetReglementById(id: number) {
    this.reglement = this.service.GetReglementById(id);
  }
  EditReglement(){
    var changeddate=DateFormatter.DateFromObject(this.datereg.year,this.datereg.month,this.datereg.day)
    this.reglement.date=changeddate;
    this.service.EditReglement(this.reglement,this.id);
    console.log("date to push ",this.reglement.date);
    this.ngOnInit();
    
// this.editedreglement=this.reglement;
// this.editedreglement.date=this.datereg;

  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.GetReglementById(this.id);
      console.log(this.reglement);
      
      // GET DATE and conver to object for input
      var date_converted = new Date(this.reglement.date);
      var year = date_converted.getFullYear();
      var month = date_converted.getMonth() + 1;
      var day = date_converted.getDate();
      console.log("AAAAAAAAAAAAAAAA",{year:year,month:month,day:day});
      this.datereg={year:year,month:month,day:day}
  
    });
  }
  ngOnDestroy(): void {}
}
