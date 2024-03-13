import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SICKNESS } from '../../../mock/sickness';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { PoliciesService } from '../../services/policies.service';
import { ClinicsService } from '../../services/clinics.service';
import { IllnessesService } from '../../services/illnesses.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';


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

    this.form.addControl('policies', new FormControl([]));
    this.form.controls['policies'].disable();
    this.form.controls['policies'].addValidators([Validators.required])


    this.form.addControl('clinics' , new FormControl([]));
    this.form.controls['clinics'].disable();
    this.form.controls['clinics'].addValidators([Validators.required])

    this.form.addControl('illness', new FormControl(''));
    this.form.controls['illness'].disable();
    this.form.controls['illness'].addValidators([Validators.required])
  }




  filteredOption: Observable<string[]> | undefined;

  async ngOnInit() {

    const clinics = await this.clinicsService.getClinics();

    if(clinics.get('clinics')?.length > 1) {
      this.form.controls['clinics'].enable();
      this.form.controls['clinics'].setValue(clinics.get('clinics'));  
    }

    this.filteredOption = this.suggests?.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value || '')),
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.form.controls['clinics'].getRawValue().filter((clinic: string) => clinic?.toLowerCase().includes(filterValue));
  }

  async onKeyUpTypeId(event: any) {
    event.preventDefault();
    const value = event?.target?.value as unknown as number;
    const policies = await this.policiesService.getPolicies(value);
    
    if(!policies.get('name')) {
      this.form.controls['name'].setValue('Usuario no existe en el sistema');
    } else {
      this.form.controls['name'].setValue(policies.get('name'));
    }

    if(policies.get('policies')?.length == 0) {
      this.form.controls['policies'].setValue([]);
      this.form.controls['policies'].disable();
    } else {
      this.form.controls['policies'].enable();
      this.form.controls['policies'].setValue(policies.get('policies'));
    }
  }
  async onKeyUpIllness(event: any) {
    event.preventDefault();
    const description = event?.target?.value as unknown as string;
    const illnesses = await this.illnessService.getIllnesses(description);
    console.log(illnesses.data);
  }  



} 
