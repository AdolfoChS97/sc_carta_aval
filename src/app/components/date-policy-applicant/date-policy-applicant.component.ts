import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { CLINICAS } from '../../../mock/clinic'; 
import { SICKNESS } from '../../../mock/sickness';



interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-date-policy-applicant',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,

  ],
  templateUrl: './date-policy-applicant.component.html',
  styleUrl: './date-policy-applicant.component.css'
})
export class DatePolicyApplicantComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  sickness = SICKNESS

  clinicas = CLINICAS;

}
