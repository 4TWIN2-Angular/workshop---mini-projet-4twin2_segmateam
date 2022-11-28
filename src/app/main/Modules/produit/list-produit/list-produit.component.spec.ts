import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitComponent } from './list-produit.component';

describe('ListProduitComponent', () => {
  let component: ListProduitComponent;
  let fixture: ComponentFixture<ListProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
