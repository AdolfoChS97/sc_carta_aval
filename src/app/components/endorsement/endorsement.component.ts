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
import { ThirdPartiesService } from '../../services/third-parties.service';
import { ThirdParties } from '../../types/ThirdParty';


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
    IllnessesService,
    ThirdPartiesService
  ],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.css'
})
export class EndorsementComponent  implements OnInit {


  codePhone = new FormControl('');
  codeOption: string[] = ['One', 'Two', 'Three'];

  policies: string[] | [] = [];
  thirdParties: ThirdParties[] | [] = [];
  suggests = new FormControl('') as FormControl<string>;
  suggestsIllness = new FormControl('') as FormControl<string>;
  phone = new FormControl('') as FormControl<string>;
  email = new FormControl('') as FormControl<string>;
  form: FormGroup = new FormGroup({});
  filteredOption: Observable<string[]> | undefined;
  filteredIllness: Observable<any> | undefined;


  phoneCode: any[] = [
    {value: '0414-' , viewValue: '0414'},
    {value: '0424-' , viewValue: '0424'},
    {value: '0412-' , viewValue: '0412'},
    {value: '0416-' , viewValue: '0416'},
    {value: '0426-' , viewValue: '0426'},
  ]

  constructor(
    private policiesService : PoliciesService,
    private clinicsService : ClinicsService,
    private illnessService : IllnessesService,
    private thirdPartiesService : ThirdPartiesService
  ) {
    this.form.addControl('name', new FormControl(''));
    this.form.controls['name'].disable();

    this.form.addControl('id', new FormControl(''));
    this.form.controls['id'].addValidators([Validators.required]);

    this.form.addControl('phone' , new FormControl(''));
    this.form.controls['phone'].disable();
    this.form.controls['phone'].addValidators([Validators.required]);

    this.form.addControl('email' , new FormControl(''));
    this.form.controls['email'].disable();
    this.form.controls['email'].addValidators([Validators.required]);

    this.form.addControl('policy', new FormControl([]));
    this.form.controls['policy'].disable();
    this.form.controls['policy'].addValidators([Validators.required])


    this.form.addControl('clinics' , new FormControl([]));
    this.form.controls['clinics'].disable();
    this.form.controls['clinics'].addValidators([Validators.required])

    this.form.addControl('illness', new FormControl([]));
    this.form.controls['illness'].disable();
    this.form.controls['illness'].addValidators([Validators.required])

    this.form.addControl('thirdParty', new FormControl(''));
    this.form.controls['thirdParty'].disable();

    this.form.addControl('telephone', new FormControl(''));
    this.form.controls['telephone'].disable();
  }

  async ngOnInit() {
    try {
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
    } catch (e) {
      this.suggests.disable();
      this.form.controls['clinics'].disable();
      this.form.controls['clinics'].setValue([]);

    }
  }

  async selectedPolicy(event: MatSelectChange) {
    const { value } = event;
    this.form.controls['policy'].setValue(value);
    this.thirdParties = await this.thirdPartiesService.getThirdPartiesBy(value);
    if(this.thirdParties?.length > 0) {
      this.form.controls['thirdParty'].enable();
    } else {
      this.form.controls['thirdParty'].disable();
    }
  }

  async onKeyUpTypeId(event: any) { 
    event.preventDefault();
    const value = event?.target?.value as unknown as number;
    const user = (await this.policiesService.getPolicies(value)).get('name') as unknown as string;
    const phoneUser = (await this.policiesService.getPolicies(value)).get('phone') as unknown as string;
    const emailUser = (await this.policiesService.getPolicies(value)).get('email') as unknown as string;
    const policies = (await this.policiesService.getPolicies(value)).get('policies') as unknown as string[] | [];
    this.policies = policies;
    
    
    if(!user) {
      this.form.controls['name'].setValue('Usuario no existe en el sistema');
      this.form.controls['thirdParty'].disable();
      this.form.controls['thirdParty'].setValue('');
      this.thirdParties = [];
    } else {
      this.form.controls['name'].setValue(user);
    }

    if(policies?.length == 0) {
      this.form.controls['policy'].setValue('');
      this.form.controls['policy'].disable();
    } else {
      this.form.controls['policy'].enable();
    }

    if(phoneUser){
      this.form.controls['phone'].enable();
      this.form.controls['phone'].setValue(phoneUser);
    }
    if(emailUser){
      this.form.controls['email'].enable();
      this.form.controls['email'].setValue(emailUser);
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
