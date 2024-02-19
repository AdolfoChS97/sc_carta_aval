import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-endorsement',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './endorsement.component.html',
  styleUrl: './endorsement.component.css'
})
export class EndorsementComponent {
  form: FormGroup = new FormGroup({});

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
