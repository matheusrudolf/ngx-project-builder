import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private baseUrl: string = `http://${window.location.hostname}:8080`;

  constructor(private http: HttpClient) { }

  public requestJson(fileName: string): Observable<any> {
    return this.http.get<any>(`../assets/jsons/${fileName}.json`);
  }

  public requestGet(path: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/plugin-projectbuilder/${path}`);
  }

  public requestPost(path: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/plugin-projectbuilder/${path}`, {});
  }

}
