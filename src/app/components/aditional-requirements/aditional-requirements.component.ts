import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-aditional-requirements',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  templateUrl: './aditional-requirements.component.html',
  styleUrl: './aditional-requirements.component.css'
})
export class AditionalRequirementsComponent {


}
