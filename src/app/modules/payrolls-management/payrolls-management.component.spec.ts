import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollsManagementComponent } from './payrolls-management.component';

describe('PayrollsManagementComponent', () => {
  let component: PayrollsManagementComponent;
  let fixture: ComponentFixture<PayrollsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
