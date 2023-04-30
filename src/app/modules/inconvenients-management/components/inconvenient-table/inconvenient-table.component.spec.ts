import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconvenientTableComponent } from './inconvenient-table.component';

describe('InconvenientTableComponent', () => {
  let component: InconvenientTableComponent;
  let fixture: ComponentFixture<InconvenientTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconvenientTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InconvenientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
