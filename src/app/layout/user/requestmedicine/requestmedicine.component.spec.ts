import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestmedicineComponent } from './requestmedicine.component';

describe('RequestmedicineComponent', () => {
  let component: RequestmedicineComponent;
  let fixture: ComponentFixture<RequestmedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestmedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
