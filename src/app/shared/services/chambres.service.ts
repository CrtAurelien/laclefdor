import { Injectable } from '@angular/core';
import {Chambre} from "../../core/models/chambre";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class ChambresService {
  // constante url api
  urlApi = 'https://laclefdor-odelicesdesarah.fr/api-laclefdor/public/api/rooms';

  constructor(private httpClient: HttpClient) {
  }

  // get API
  getChambresApi(): Observable<Chambre[]> {
     return this.httpClient.get<Chambre[]>(this.urlApi);
  }
}
