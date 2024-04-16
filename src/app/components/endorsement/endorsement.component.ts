import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { PoliciesService } from '../../services/policies.service';
import { ClinicsService } from '../../services/clinics.service';
import { IllnessesService } from '../../services/illnesses.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { _filter } from '../../utils/filter';
import { ThirdPartiesService } from '../../services/third-parties.service';
import { ThirdParties } from '../../types/ThirdParty';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


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
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  providers : [
    provideNativeDateAdapter(),
    PoliciesService,
    ClinicsService,
    IllnessesService,
    ThirdPartiesService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.css'
})
export class EndorsementComponent  implements OnInit {


  illnesses: any;
  clinics: any;
  policies: string[] | [] = [];
  thirdParties: ThirdParties[] | [] = [];
  suggests = new FormControl('') as FormControl<string>;
  suggestsIllness = new FormControl('') as FormControl<string>;
  phone = new FormControl('') as FormControl<string>;
  email = new FormControl('') as FormControl<string>;
  checkbox: boolean = false;

  form: FormGroup = new FormGroup({});
  filteredOption: Observable<string[]> | undefined;
  filteredIllness: Observable<any> | undefined;



  codePhone: any[] = [
    {value: '0414' , viewValue: '0414'},
    {value: '0424' , viewValue: '0424'},
    {value: '0412' , viewValue: '0412'},
    {value: '0416' , viewValue: '0416'},
    {value: '0426' , viewValue: '0426'},
  ]

  @Output('endorsementData') endorsementData: any = new EventEmitter();

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

    this.form.addControl('policy', new FormControl([]));
    this.form.controls['policy'].disable();
    this.form.controls['policy'].addValidators([Validators.required])

    
    this.form.addControl('illness', new FormControl(''));
    this.form.controls['illness'].disable();
    this.form.controls['illness'].addValidators([Validators.required]);

    this.form.addControl('dateAttention' , new FormControl(''));
    this.form.controls['dateAttention'].addValidators([Validators.required]);

    this.form.addControl('budgetNumber' , new FormControl(''));
    this.form.controls['budgetNumber'].addValidators([Validators.required]);

    this.form.addControl('budgetAmount' , new FormControl(''));
    this.form.controls['budgetAmount'].addValidators([Validators.required]);


    this.form.addControl('phone' , new FormControl(''));
    this.form.controls['phone'].disable();
    this.form.controls['phone'].addValidators([Validators.required]);

    this.form.addControl('email' , new FormControl(''));
    this.form.controls['email'].disable();
    this.form.controls['email'].addValidators([Validators.required]);


    this.form.addControl('clinic' , new FormControl([]));
    this.form.controls['clinic'].disable();
    this.form.controls['clinic'].addValidators([Validators.required])


    this.form.addControl('thirdParty', new FormControl(''));
    this.form.controls['thirdParty'].disable();
  }

  async ngOnInit() {
    try {
      const clinics = await this.clinicsService.getClinics();

      if(clinics.get('clinics')?.length > 1) {
        this.form.controls['clinic'].enable();  
        this.clinics = clinics.get('clinics');
      }

      this.filteredOption = this.suggests?.valueChanges.pipe(
        startWith(''),
        map((value: string) => _filter(value || '', this.clinics)),
      );

    } catch (e) {
      this.suggests.disable();
      this.form.controls['clinic'].disable();
      this.form.controls['clinic'].setValue([]);

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
      this.form.controls['phone'].setValue(phoneUser);
    }
    if(emailUser){
      this.form.controls['email'].setValue(emailUser);
    }

  }
  async onKeyUpIllness(event: any) {
    event.preventDefault();
    const description = event?.target?.value as unknown as string;
    const illnesses = await this.illnessService.getIllnesses(description);

    if(illnesses?.length > 1){
      this.form.controls['illness'].enable();
      this.illnesses = illnesses;
    }

    this.filteredIllness = this.suggestsIllness?.valueChanges.pipe(
      startWith(''),
      map((value: string) => _filter(value || '', this.illnesses)),
    )
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if(event?.checked) {
      this.form.controls['phone'].enable();
      this.form.controls['email'].enable();
    } else {
      this.form.controls['phone'].disable();
      this.form.controls['email'].disable();
    }
  }
  numberPresupuesto(event: any, type: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;  
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent, identificator: string) {
    const value = event?.option?.value as unknown as string;
    this.form.controls[identificator].setValue(value);
  }

  onDateChange($event: MatDatepickerInputEvent<string>) {
    const value = $event?.value as unknown as string;
    this.form.controls['dateAttention'].setValue(value);
  }

  onSubmit(){
    if(this.form.valid) {
      this.endorsementData.emit(this.form.getRawValue());
    } else {
      // TODO: mostrar error
    }
  
  }

} 
