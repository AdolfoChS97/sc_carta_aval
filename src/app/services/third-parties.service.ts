import { Injectable } from '@angular/core';
import { environment } from '../environments/environmet.dev';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';
import { GetThirdPartiesByPolicyIdResponse } from '../types/ThirdParty';
import { getThirdPartiesMapper } from '../mappers/third_parties_mapper';


const { url, production } = environment;

@Injectable({
  providedIn: 'root'
})
export class ThirdPartiesService {

  url = !production ? url : '';

  constructor(private http: HttpClient) { }

  async getThirdPartiesBy(policyId: string): Promise<any> {
    const urlParams = new URLSearchParams([ ['id_poliza', policyId] ]);
    const request$ = this.http.get<GetThirdPartiesByPolicyIdResponse>(`${this.url}/backend-asegurados/src/modules/carta-aval/terceros.php?${urlParams.toString()}`).pipe(take(1));

    return getThirdPartiesMapper(await lastValueFrom(request$));
  }
}
