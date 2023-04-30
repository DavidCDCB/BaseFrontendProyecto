import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconvenientFormComponent } from './inconvenient-form.component';

describe('InconvenientFormComponent', () => {
  let component: InconvenientFormComponent;
  let fixture: ComponentFixture<InconvenientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconvenientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InconvenientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
