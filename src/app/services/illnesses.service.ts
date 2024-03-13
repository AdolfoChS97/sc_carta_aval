import { Injectable } from '@angular/core';
import { environment } from '../environments/environmet.dev';
import { isReadable } from 'stream';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { lastValueFrom } from 'rxjs';


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
    const request$ = this.http.get(`${this.url}/backend-asegurados/src/modules/carta-aval/enfermedades.php?${urlParams.toString()}`).pipe(take(1));

    return await lastValueFrom(request$);
  }

}
