import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProduitComponent } from './main-produit.component';

describe('MainProduitComponent', () => {
  let component: MainProduitComponent;
  let fixture: ComponentFixture<MainProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
