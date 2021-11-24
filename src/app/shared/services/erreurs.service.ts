import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErreursService {
  messageErreur : string;
  messageErreurSubject = new Subject<string>();

  constructor() { }

  setMessageErreur(message: string) {
    this.messageErreur = message;
    this.messageErreurSubject.next(this.messageErreur);
  }

  getMessageErreur(): Observable<string> {
    return this.messageErreurSubject;
  }
}
