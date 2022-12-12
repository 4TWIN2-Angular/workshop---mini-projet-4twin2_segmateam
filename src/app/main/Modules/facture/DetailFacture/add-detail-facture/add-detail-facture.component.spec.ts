import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailFactureComponent } from './add-detail-facture.component';

describe('AddDetailFactureComponent', () => {
  let component: AddDetailFactureComponent;
  let fixture: ComponentFixture<AddDetailFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
