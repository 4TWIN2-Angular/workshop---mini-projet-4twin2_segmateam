import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailFactureComponent } from './update-detail-facture.component';

describe('UpdateDetailFactureComponent', () => {
  let component: UpdateDetailFactureComponent;
  let fixture: ComponentFixture<UpdateDetailFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
