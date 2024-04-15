import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EndorsementComponent } from './components/endorsement/endorsement.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { BudgetBreakdownComponent } from './components/budget-breakdown/budget-breakdown.component';
import { BudgetMedicalComponent } from './components/budget-medical/budget-medical.component';
import { FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';


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
    MatStepperModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  budgetBreakdown = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  budgetMedical = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  })
  endorsementFormGro = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;


  constructor(private _formBuilder: FormBuilder) {}
}
