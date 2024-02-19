import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SICKNESS } from '../../../mock/sickness';
import { CLINICAS } from '../../../mock/clinic';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-endorsement',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    
  ],
  providers : [provideNativeDateAdapter()],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.css'
})
export class EndorsementComponent {
  form: FormGroup = new FormGroup({});

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  telefono: any[] = [
    {value: '0414' , viewValue: '0414'},
    {value: '0424' , viewValue: '0424'},
    {value: '0412' , viewValue: '0412'},
    {value: '0416' , viewValue: '0416'},
    {value: '0426' , viewValue: '0426'},
  ]


  sickness = SICKNESS;
  clinics = CLINICAS;
  

  constructor() {
    this.form.addControl('name', new FormControl(''));
    this.form.controls['name'].disable();

    this.form.addControl('id', new FormControl(''));
    this.form.controls['id'].addValidators([Validators.required])
  }

  onKeyUp(event: any) {
    event.preventDefault();
    const value = event?.target?.value ;

    console.log(value);
  
  }
}
