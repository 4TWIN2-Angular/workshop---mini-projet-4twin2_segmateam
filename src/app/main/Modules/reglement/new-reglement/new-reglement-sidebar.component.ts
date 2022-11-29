import { Component, Input, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { FormGroup, FormControl,Validators } from "@angular/forms";
import { ReglementService } from "../reglement.service";
@Component({
  selector: "app-new-reglement-sidebar",
  templateUrl: "./new-reglement-sidebar.component.html",
  styleUrls: ["./new-reglement-sidebar..component.scss"],
})
export class NewRegSidebarComponent implements OnInit {
  regform = new FormGroup({
    date: new FormControl("",[
      Validators.required,
   
    ]),
    montantPaye: new FormControl("",[  
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(2),
      Validators.min(10),
      Validators.pattern("^[0-9]*$")
    ]),
    
    montantRestant: new FormControl("",[
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(2),Validators.min(5)]
      
      
    ),
    payee: new FormControl(
      
    ),
  });

  // @Input() reg!: number;
  // @Input() edit!: Boolean;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService,private service: ReglementService) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  AddReglement() {
    console.log("form updated",this.regform.value);
    this.service.AddReglement(this.regform.value);
  }
 
  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.toggleSidebar("new-reglement-sidebar");
      form.reset();
    }
  }

  ngOnInit(): void {
    console.log("loaded");
    
  }
  ngOnDestroy(): void {}
}
