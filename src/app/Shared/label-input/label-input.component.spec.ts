import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInputComponent } from './label-input.component';

describe('LabelInputComponent', () => {
  let component: LabelInputComponent;
  let fixture: ComponentFixture<LabelInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelInputComponent]
    });
    fixture = TestBed.createComponent(LabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
