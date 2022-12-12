import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFactureReglementComponent } from './detail-facture-reglement.component';

describe('DetailFactureReglementComponent', () => {
  let component: DetailFactureReglementComponent;
  let fixture: ComponentFixture<DetailFactureReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFactureReglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFactureReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
