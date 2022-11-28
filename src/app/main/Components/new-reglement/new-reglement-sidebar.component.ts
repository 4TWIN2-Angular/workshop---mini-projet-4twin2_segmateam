import { Component, Input, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-new-reglement-sidebar",
  templateUrl: "./new-reglement-sidebar.component.html",
})
export class NewRegSidebarComponent implements OnInit {
  regform = new FormGroup({
    date: new FormControl(""),
    montantpaye: new FormControl(""),
    montantrestant: new FormControl(""),
    payee: new FormControl(""),
  });

  // @Input() reg!: number;
  // @Input() edit!: Boolean;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  AddReglement() {
    console.log(this.regform.value);
  }
  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.toggleSidebar("new-reglement-sidebar");
    }
  }

  ngOnInit(): void {
    console.log("loaded");
  }
}
