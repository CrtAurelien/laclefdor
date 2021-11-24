import { Injectable } from '@angular/core';
import {Reservation} from "../../core/models/reservation";
import {Observable, of, Subject} from "rxjs";
import {Chambre} from "../../core/models/chambre";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  urlApi = 'https://laclefdor-odelicesdesarah.fr/api-laclefdor/public/api/';
  urlApipost = 'https://laclefdor-odelicesdesarah.fr/api-laclefdor/public/api/validation-reservation';
  listeReservation : Reservation[];
  listeDateSelectionneeSubject = new Subject();
  listeDateSelectionn = {
    dateDebut : null,
    dateFin: null
  };
  nombrePersonneVoulu;
  nombrePersonneVOuluSubject = new Subject();
  chambre: Chambre;
  dateReservee;
  client;
  paiementEffectue = false;
  nombrePetitDejVoulu;
  tarufTotalReservation;

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  setListeDateSelectionnee(dateDebut: any, dateFin: any) {
    this.listeDateSelectionn.dateDebut = dateDebut;
    this.listeDateSelectionn.dateFin = dateFin;
    this.listeDateSelectionneeSubject.next(this.listeDateSelectionn);
  }

  setNombrePersonneVoulu(nombre: any) {
    this. nombrePersonneVoulu = nombre;
    this.nombrePersonneVOuluSubject.next(this.nombrePersonneVoulu);
  }

  // On retourne l'ensemble des réservation
  getListeReservation(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.urlApi + 'reservations');
  }

  setListeReservation(listeReservation: Reservation[]) {
    this.listeReservation = listeReservation;
  }

  // On retourne les reservation de la chambre passée en parametre
  getReservationsForARoom(room: Chambre) {
    // On filtre notre liste de reservation a partir de l'identifiant de la chambre passée en parametre
    const listeReservations = this.listeReservation.filter(reservation => reservation.idChamber === room.id);
    return listeReservations;
  }

   getDates (startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function(days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  enregistrerReservation(idChambre: number, startDate: Date, endDate: Date, firstName: string,
                         lastName: string, email: string, phone: string,nombrePersonne: any, nombrePetitDejeuner: number, tarifTotalResa: any ): Observable<any>{
    return this.httpClient.post(this.urlApipost, {
      idChamber: idChambre,
      startDate: this.datePipe.transform(startDate, 'yyyy-MM-dd h:mm:ss'),
      endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd h:mm:ss'),
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      nombrePersonne: nombrePersonne,
      nombrePetitDejeuner: nombrePetitDejeuner,
      prixReservation: tarifTotalResa
    });
  }

  envoiEmailConfirmation(nomClient: string, prenomClient: string, emailClient: string): Observable<any> {
    return this.httpClient.post(this.urlApi + 'email', {
      email: emailClient
    })
  }


}
