import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackgroundSwitchService {

  nomClasseDynamique = 'blue';
  nomClasseSubject = new BehaviorSubject('blue');

  constructor() {
  }

  getNomClasseSubject(): Observable<any> {
    return this.nomClasseSubject
  }

  setNomClasseDynamique(nomClasse: string) {
    this.nomClasseDynamique = nomClasse;
    this.nomClasseSubject.next(this.nomClasseDynamique);
  }
}
