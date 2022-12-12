import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainstockComponent } from './mainstock.component';

describe('MainstockComponent', () => {
  let component: MainstockComponent;
  let fixture: ComponentFixture<MainstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
