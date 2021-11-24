import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatageService {

  constructor() { }

  retournerArrondiNSignificatif(valeurNumerique: number, nbSignificatif =2) : number{
    return parseFloat(valeurNumerique.toFixed(nbSignificatif));
  }

}
