import { Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-breakdown',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './budget-breakdown.component.html',
  styleUrl: './budget-breakdown.component.css'
})

export class BudgetBreakdownComponent{
form :FormGroup = new FormGroup({})

constructor(){
  this.form.addControl('clinicExpenses' , new FormControl(''));
  this.form.controls['clinicExpenses'].disable();

  this.form.addControl('honoraryExpenses' , new FormControl(''));
  this.form.controls['honoraryExpenses'].disable();

  this.form.addControl('totalExpenses' , new FormControl(''));
  this.form.controls['totalExpenses'].disable();
}
}
