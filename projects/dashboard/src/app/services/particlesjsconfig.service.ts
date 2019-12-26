import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticlesjsconfigService {

private _config: Object
private _env: string;

constructor(private http: HttpClient) { }

}
