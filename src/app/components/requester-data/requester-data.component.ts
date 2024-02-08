import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requester-data',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './requester-data.component.html',
  styleUrl: './requester-data.component.css'
})
export class RequesterDataComponent {
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
