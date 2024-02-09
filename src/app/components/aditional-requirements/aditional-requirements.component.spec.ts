import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalRequirementsComponent } from './aditional-requirements.component';

describe('AditionalRequirementsComponent', () => {
  let component: AditionalRequirementsComponent;
  let fixture: ComponentFixture<AditionalRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditionalRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AditionalRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
