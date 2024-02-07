import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePolicyApplicantComponent } from './date-policy-applicant.component';

describe('DatePolicyApplicantComponent', () => {
  let component: DatePolicyApplicantComponent;
  let fixture: ComponentFixture<DatePolicyApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePolicyApplicantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePolicyApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
