import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterDataComponent } from './requester-data.component';

describe('RequesterDataComponent', () => {
  let component: RequesterDataComponent;
  let fixture: ComponentFixture<RequesterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequesterDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequesterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
