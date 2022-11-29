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
  id: any;
  form = {
    date: { year: null, month: null, day: null },
    montantpaye: null,
    montantrestant: null,
    payee: false,
  };

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
    console.warn(form);
  }
  GetReglementById(id: number) {
    this.reglement = this.service.GetReglementById(id);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      console.log(this.id);
      this.GetReglementById(this.id);
      // GET DATE and conver to object for input
      var datereg = new Date(this.reglement.date);
      this.form.date.year = datereg.getFullYear();
      this.form.date.month = datereg.getMonth() + 1;
      this.form.date.day = datereg.getDate();
      // Convert from date object to Date yyyy-mm-dd
      DateFormatter.DateFromObject(
        this.form.date.year,
        this.form.date.month,
        this.form.date.day
      );

      console.log("aaaaaaaa");
      //////////////////
      this.form.montantpaye = this.reglement.montantPaye;
      this.form.montantrestant = this.reglement.montantRestant;
      this.form.payee = this.reglement.payee;
      console.log("loaded", this.reglement);
      console.log("trahhh", this.form.montantrestant, this.form.date);
    });
  }
  ngOnDestroy(): void {}
}
