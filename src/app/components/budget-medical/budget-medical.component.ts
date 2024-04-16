import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { FORMERR } from 'node:dns';



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
    MatSelectModule,
    MatListModule,
    MatTableModule
  ],
  templateUrl: './budget-medical.component.html',
  styleUrl: './budget-medical.component.css'
})
export class BudgetMedicalComponent {

  @Output('budgetMedicalData') budgetMedicalData: any = new EventEmitter();


  documents: File[] = [];
  typeDocuments: Array<{ id: number, name: string }> = [
    { id: 1, name: 'Informe del Medico' },
    { id: 2, name: 'Presupuesto de la institución' },
    { id: 3, name: 'Resultado de estudios practicos' },
    { id: 4, name: 'Resultado de exámenes practicos' },
    { id: 5, name: 'Otros' }
  ];
  @ViewChild('docs') docsSelect: MatSelect | undefined;
  @ViewChild('types') typesSelect: MatSelect | undefined;
  @ViewChild('table') table: ElementRef | undefined;

  pairs: any[] = [];
  dataSource = this.pairs ;
  displayedColumns = ["tipoRecaudo", "documentoAsignado"];
  

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
  };

  isPdf(file: File) {
    return file.type === 'application/pdf';
  };


  pairDoc(){
    const document: File = this.documents[this.docsSelect?.value];
    const type = this.typeDocuments[this.typesSelect?.value -1];
    this.documents.splice(this.docsSelect?.value , this.docsSelect?.value);    
    this.pairs.push([type.name, document]);
    console.log(this.pairs);
  };

  deletePairDoc(id: number) {
    const table = this.table?.nativeElement;
    if (table) {
      this.pairs.splice(0, id);
      table.deleteRow(id+1);
      console.log(this.pairs);
    } else {
      console.error('Error al eliminar fila de la tabla');
    }
  }

  onSubmit(){
    if(this.pairs.length > 0) {
        this.budgetMedicalData.emit(this.pairs);
    } else {
      // TODO: mostrar error
    }
  }

  onBackClick() {
    this.budgetMedicalData.emit({ back: true });
  }

}
