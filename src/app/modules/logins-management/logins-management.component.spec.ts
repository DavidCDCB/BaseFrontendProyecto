import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsManagementComponent } from './logins-management.component';

describe('LoginsManagementComponent', () => {
  let component: LoginsManagementComponent;
  let fixture: ComponentFixture<LoginsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
