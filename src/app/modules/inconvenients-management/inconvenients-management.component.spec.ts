import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconvenientsManagementComponent } from './inconvenients-management.component';

describe('InconvenientsManagementComponent', () => {
  let component: InconvenientsManagementComponent;
  let fixture: ComponentFixture<InconvenientsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconvenientsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InconvenientsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
