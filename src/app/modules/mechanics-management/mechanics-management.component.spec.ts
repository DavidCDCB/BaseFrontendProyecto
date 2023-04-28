import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicsManagementComponent } from './mechanics-management.component';

describe('MechanicsManagementComponent', () => {
  let component: MechanicsManagementComponent;
  let fixture: ComponentFixture<MechanicsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
