import { Component, OnInit } from '@angular/core';
import {Chambre} from "../../core/models/chambre";
import {ChambresService} from "../services/chambres.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {ReservationsService} from "../services/reservations.service";

@Component({
  selector: 'app-liste-chambres',
  templateUrl: './liste-chambres.component.html',
  styleUrls: ['./liste-chambres.component.scss']
})
export class ListeChambresComponent implements OnInit {
  listeChambres: Chambre[];
  ngUnsubscribe = new Subject();
  showMsgNoRooms = false;
  showMsgNoRoomsCapacity = false;
  displayLoader = false;
  constructor(private chambresService: ChambresService, private reservationService: ReservationsService) { }

  ngOnInit(): void {
    this.chambresService.getChambresApi().pipe(
      tap(listeChambre => {
        this.listeChambres = listeChambre
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe();
    // On s'abonne au chamngement sur les dates selectionnées par le user
    this.reservationService.listeDateSelectionneeSubject.pipe(
      tap((data: any) => {
        // On affiche un message specifique si aucune chambre disponible aux date voulue
        this.verifierListeChambreApresTriDate();
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
    this.reservationService.nombrePersonneVOuluSubject.pipe(
      tap(data => {
        // On applique le filtre sur le nombre de personne
        this.verifierListeChambreApresDiteNombrePersonne();
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
    this.reservationService.getListeReservation().pipe(
      tap(data => {
        this.reservationService.setListeReservation(data);
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
  }

  // Verifie le nombre de chambre affichée à l'écran après le tri sur les dates
  // Si aucune chambre affichée, on set la variable showMsgNoRooms a true permettant d'afficher le message
  // Sur la vue html
  verifierListeChambreApresTriDate() {
    let nombreChambreVisible = 0;
    this.showMsgNoRooms = false;
    this.listeChambres.forEach(chambre => {
      if(chambre.isDisplay) {
        nombreChambreVisible += 1;
      }
    })
    if(nombreChambreVisible === 0) {
      this.showMsgNoRooms = true;
    }
  }

  verifierListeChambreApresDiteNombrePersonne() {
    setTimeout(() => {
      let nombreChambreVisible = 0;
      this.showMsgNoRoomsCapacity = false;
      this.listeChambres.forEach(chambre => {
        if(chambre.isDisplay) {
          nombreChambreVisible += 1;
        }
      })
      if(nombreChambreVisible === 0) {
        this.showMsgNoRoomsCapacity = true;
      }
    }, 0)

  }

}
