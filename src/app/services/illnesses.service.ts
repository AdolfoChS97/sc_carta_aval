import { Injectable } from '@angular/core';
import { environment } from '../environments/environmet.dev';
import { isReadable } from 'stream';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { getIllnessesMapper } from '../mappers/illneses_mapper';
import { GetIllnesResponse } from '../types/illneses';


const {url , production} = environment;
@Injectable({
  providedIn: 'root'
})
export class IllnessesService {
    url = !production ? url : '';

  constructor( private http: HttpClient) { }

  async getIllnesses(description: string):
  Promise<any> {
    const urlParams = new URLSearchParams([ ['description', description] ]);
    const request$ = this.http.get<GetIllnesResponse>(`${this.url}/backend-asegurados/src/modules/carta-aval/enfermedades.php?${urlParams.toString()}`).pipe(take(1));

    return await getIllnessesMapper(await lastValueFrom(request$));
  }

}
