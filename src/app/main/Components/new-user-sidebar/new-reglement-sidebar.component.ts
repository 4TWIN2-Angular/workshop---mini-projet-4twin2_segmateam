import { Component, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-reglement-sidebar",
  templateUrl: "./new-reglement-sidebar.component.html",
})
export class NewRegSidebarComponent implements OnInit {
  public date;
  public montantpaye;
  public montantrestant;
  public payee;
  public selectedDate: Date;

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

  ngOnInit(): void {}
}
