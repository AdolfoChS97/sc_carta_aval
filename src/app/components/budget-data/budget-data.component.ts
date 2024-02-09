import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-budget-data',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './budget-data.component.html',
  styleUrl: './budget-data.component.css'
})
export class BudgetDataComponent {
  form: FormGroup = new FormGroup({});

  constructor() {
    this.form.addControl('budgetId', new FormControl(''));
    this.form.controls['budgetId'].addValidators([Validators.required])

    this.form.addControl('budgetAmount', new FormControl(''));

    this.form.controls['budgetAmount'].disable();

    this.form.controls['budgetAmount'].addValidators([Validators.required])
  }
}
