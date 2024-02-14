import { Component, PipeTransform } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-budget-breakdown',
  standalone: true,
  imports: [
    MatCommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './budget-breakdown.component.html',
  styleUrl: './budget-breakdown.component.css'
})

export class BudgetBreakdownComponent{


}
