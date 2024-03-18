import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SICKNESS } from '../../../mock/sickness';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { PoliciesService } from '../../services/policies.service';
import { ClinicsService } from '../../services/clinics.service';
import { IllnessesService } from '../../services/illnesses.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { _filter } from '../../utils/filter';


@Component({
  selector: 'app-endorsement',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ],
  providers : [
    provideNativeDateAdapter(),
    PoliciesService,
    ClinicsService,
    IllnessesService
  ],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.css'
})
export class EndorsementComponent  implements OnInit {

  policies: string[] | [] = [];
  suggests = new FormControl('') as FormControl<string>;
  suggestsIllness = new FormControl('') as FormControl<string>;
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

  

  constructor(
    private policiesService : PoliciesService,
    private clinicsService : ClinicsService,
    private illnessService : IllnessesService
  ) {
    this.form.addControl('name', new FormControl(''));
    this.form.controls['name'].disable();

    this.form.addControl('id', new FormControl(''));
    this.form.controls['id'].addValidators([Validators.required])

    this.form.addControl('policy', new FormControl([]));
    this.form.controls['policy'].disable();
    this.form.controls['policy'].addValidators([Validators.required])


    this.form.addControl('clinics' , new FormControl([]));
    this.form.controls['clinics'].disable();
    this.form.controls['clinics'].addValidators([Validators.required])

    this.form.addControl('illness', new FormControl([]));
    this.form.controls['illness'].disable();
    this.form.controls['illness'].addValidators([Validators.required])
  }




  filteredOption: Observable<string[]> | undefined;
  filteredIllness: Observable<any> | undefined;

  async ngOnInit() {

    const clinics = await this.clinicsService.getClinics();

    if(clinics.get('clinics')?.length > 1) {
      this.form.controls['clinics'].enable();
      this.form.controls['clinics'].
      setValue(clinics.get('clinics'));  
    }

    this.filteredOption = this.suggests?.valueChanges.pipe(
      startWith(''),
      map((value: string) => _filter(value || '', this.form.controls['clinics'].getRawValue())),
    );
  }

  selectedPolicy(event: MatSelectChange) {
    const { value } = event;
    this.form.controls['policy'].setValue(value);
    console.log(value);
  }

  async onKeyUpTypeId(event: any) { 
    event.preventDefault();
    const value = event?.target?.value as unknown as number;
    const user = (await this.policiesService.getPolicies(value)).get('name') as unknown as string;
    const policies = (await this.policiesService.getPolicies(value)).get('policies') as unknown as string[] | [];
    this.policies = policies;
    
    if(!user) {
      this.form.controls['name'].setValue('Usuario no existe en el sistema');
    } else {
      this.form.controls['name'].setValue(user);
    }

    if(policies?.length == 0) {
      this.form.controls['policy'].setValue('');
      this.form.controls['policy'].disable();
    } else {
      this.form.controls['policy'].enable();
    }
  }
  async onKeyUpIllness(event: any) {
    event.preventDefault();
    const description = event?.target?.value as unknown as string;
    const illnesses = await this.illnessService.getIllnesses(description);

    if(illnesses?.length > 1){
      this.form.controls['illness'].enable();
      this.form.controls['illness'].setValue(illnesses);
    }

    this.filteredIllness = this.suggestsIllness?.valueChanges.pipe(
      startWith(''),
      map((value: string) => _filter(value || '', this.form.controls['illness']?.getRawValue())),
    )      
  }
  

} 
