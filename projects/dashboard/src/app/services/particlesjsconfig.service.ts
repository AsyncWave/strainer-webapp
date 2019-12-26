import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticlesjsconfigService {
  private jsonURL = './../../assets/data/particles.json';
  constructor(private http: HttpClient) { }

  getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
}
