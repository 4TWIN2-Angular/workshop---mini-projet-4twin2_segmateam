import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDFComponent } from './update-df.component';

describe('UpdateDFComponent', () => {
  let component: UpdateDFComponent;
  let fixture: ComponentFixture<UpdateDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
