import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiDetailFactureComponent } from './affi-detail-facture.component';

describe('AffiDetailFactureComponent', () => {
  let component: AffiDetailFactureComponent;
  let fixture: ComponentFixture<AffiDetailFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiDetailFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiDetailFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
