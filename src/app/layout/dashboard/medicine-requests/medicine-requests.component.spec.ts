import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineRequestsComponent } from './medicine-requests.component';

describe('MedicineRequestsComponent', () => {
  let component: MedicineRequestsComponent;
  let fixture: ComponentFixture<MedicineRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
