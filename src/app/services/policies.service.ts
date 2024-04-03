import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';
import { environment } from '../environments/environmet.dev';
import { GetPoliciesByIdResponse } from '../types/Policies';
import { getPoliciesByIdMapper } from '../mappers/policies_mapper';

const { url, production } = environment;

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  url = !production ? url : '' ;
  constructor( private http: HttpClient) { }

  async getPolicies(id : number, type_id: string = 'V' ): Promise<Map<string, string>> {
      const urlParams = new URLSearchParams([ ['id', id.toString()], ['type_id', type_id] ]);
      const request$ = this.http.get<GetPoliciesByIdResponse>(`${this.url}/backend-asegurados/src/modules/carta-aval/polizas.php?${urlParams.toString()}`).pipe(take(1));
      return getPoliciesByIdMapper(await lastValueFrom(request$));
      console.log(request$);
    }
 
}
 
