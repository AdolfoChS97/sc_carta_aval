import { Component, Output, EventEmitter} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-budget-breakdown',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './budget-breakdown.component.html',
  styleUrl: './budget-breakdown.component.css'
})

export class BudgetBreakdownComponent{
form :FormGroup = new FormGroup({})

@Output('budgetBreakdownData') budgetBreakdownData: any = new EventEmitter();

constructor(){
  this.form.addControl('clinicExpenses' , new FormControl(0));
  this.form.addControl('honoraryExpenses' , new FormControl(0));
  this.form.addControl('totalExpenses' , new FormControl(0));
  this.form.controls['totalExpenses'].disable();
}

  numberOnly(event: any, type: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;  
  }


  onkeyup(){
    const v1: number = parseInt(this.form.controls['clinicExpenses'].value);
    const v2: number = parseInt(this.form.controls['honoraryExpenses'].value)
    const addition = v1 + v2;
    this.form.controls['totalExpenses'].setValue(`${addition.toLocaleString()} USD`); 

  }

  onSubmit(){
    if(this.form.valid) {
      if(this.form.controls['totalExpenses'].value){
        this.budgetBreakdownData.emit(this.form.getRawValue());
      }

    } else {
      // TODO: mostrar error
    }
  }


}
