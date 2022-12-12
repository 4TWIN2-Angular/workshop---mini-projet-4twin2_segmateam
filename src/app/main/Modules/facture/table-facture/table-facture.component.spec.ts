import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFactureComponent } from './table-facture.component';

describe('TableFactureComponent', () => {
  let component: TableFactureComponent;
  let fixture: ComponentFixture<TableFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
