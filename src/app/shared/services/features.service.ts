/* tslint:disable:no-trailing-whitespace */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chambre} from '../../core/models/chambre';
import {Observable} from 'rxjs';

export interface Feature {
  nom: string;
  etat: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  listeFeatures: Feature[] = [];
  urlApi = 'https://laclefdor-odelicesdesarah.fr/api-laclefdor/public/api/features';

  constructor(private httpClient: HttpClient) { }

  getAllFeatures(): Observable<Feature[]> {
    return this.httpClient.get<Feature[]>(this.urlApi);
  }


  featureIsOn(nom: string): boolean {
    if(this.listeFeatures.length > 0) {
      return this.listeFeatures.find(elm => elm.nom === nom).etat;
    }
  }



}
