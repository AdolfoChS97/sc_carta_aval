import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './budget-medical.component.html',
  styleUrl: './budget-medical.component.css'
})
export class BudgetMedicalComponent {

  documents: File[] = [];
  typeDocuments: Array<{ id: number, name: string }> = [
    { id: 1, name: 'Informe del Medico' },
    { id: 2, name: 'Presupuesto de la institución' },
    { id: 3, name: 'Resultado de estudios practicos' },
    { id: 4, name: 'Resultado de exámenes practicos' },
    { id: 5, name: 'Otros' }
  ];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!this.isPdf(file)) {
        alert('El archivo debe ser un PDF');
        break;
      }
      this.documents.push(file);
    }
    console.log(this.documents);
  }

  isPdf(file: File) {
    return file.type === 'application/pdf';
  }
}
