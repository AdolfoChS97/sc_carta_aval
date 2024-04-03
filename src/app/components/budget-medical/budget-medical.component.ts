import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-budget-medical',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './budget-medical.component.html',
  styleUrl: './budget-medical.component.css'
})
export class BudgetMedicalComponent {

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    console.log(files);
  }
}
