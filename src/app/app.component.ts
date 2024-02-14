import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RequesterDataComponent } from './components/requester-data/requester-data.component';
import { DatePolicyApplicantComponent } from './components/date-policy-applicant/date-policy-applicant.component';
import { AditionalRequirementsComponent } from './components/aditional-requirements/aditional-requirements.component'
import { BudgetDataComponent } from './components/budget-data/budget-data.component';
import { BudgetBreakdownComponent } from './components/budget-breakdown/budget-breakdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RequesterDataComponent,
    DatePolicyApplicantComponent,
    AditionalRequirementsComponent,
    BudgetDataComponent,
    BudgetBreakdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
