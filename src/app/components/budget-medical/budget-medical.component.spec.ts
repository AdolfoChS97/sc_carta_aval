import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMedicalComponent } from './budget-medical.component';

describe('BudgetMedicalComponent', () => {
  let component: BudgetMedicalComponent;
  let fixture: ComponentFixture<BudgetMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetMedicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
