import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconvenientModalComponent } from './inconvenient-modal.component';

describe('InconvenientModalComponent', () => {
  let component: InconvenientModalComponent;
  let fixture: ComponentFixture<InconvenientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconvenientModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InconvenientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
