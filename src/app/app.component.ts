import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EndorsementComponent } from './components/endorsement/endorsement.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { BudgetBreakdownComponent } from './components/budget-breakdown/budget-breakdown.component';
import { BudgetMedicalComponent } from './components/budget-medical/budget-medical.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FlexLayoutModule,
    RouterOutlet, 
    EndorsementComponent,
    BudgetBreakdownComponent, 
    BudgetMedicalComponent,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
