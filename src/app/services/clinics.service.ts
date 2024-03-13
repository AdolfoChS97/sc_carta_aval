import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';
import { environment } from '../environments/environmet.dev';
import { GetClinicsResponse } from '../types/clinic';
import { getClinicsMapper } from '../mappers/clinics_mappers';


const { url, production } = environment;
@Injectable({
  providedIn: 'root'
})
export class ClinicsService {
  url = !production ? url : '' ;
  constructor(private http: HttpClient) { }
  
  async getClinics(): Promise<any> {
    const request$ = this.http.get<GetClinicsResponse>(`${this.url}/backend-asegurados/src/modules/carta-aval/clinicas.php`).pipe(take(1));
    return await getClinicsMapper(await lastValueFrom(request$));
  }
  

}
