import { Component, OnInit } from '@angular/core';
import {ReservationsService} from '../services/reservations.service';
import {Subject} from 'rxjs';
import {Chambre} from '../../core/models/chambre';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {BackgroundSwitchService} from "../services/background-switch.service";
import {Router} from "@angular/router";
import {ErreursService} from "../services/erreurs.service";

@Component({
  selector: 'app-confirmation-paypal',
  templateUrl: './confirmation-paypal.component.html',
  styleUrls: ['./confirmation-paypal.component.scss']
})
export class ConfirmationPaypalComponent implements OnInit {

  idChambre;
  startDate;
  endDate;
  firstName;
  lastName;
  email;
  phone;
  requestSuccess = false;
  client;
  chambre: Chambre;
  className = "blue"
  nombrePersonne;
  nombrePetitDejeuner = 0;
  dateSelected;
  ngUnsubscribe = new Subject();
  displayLoader = false;
  tarifTotalResa;
  constructor(private reservationService: ReservationsService,private erreurService: ErreursService, private router: Router, private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className)
    this.client = this.reservationService.client;
    this.nombrePersonne = this.reservationService.nombrePersonneVoulu;
    this.chambre = this.reservationService.chambre;
    this.dateSelected = this.reservationService.dateReservee;
    this.nombrePetitDejeuner = this.reservationService.nombrePetitDejVoulu;
    this.tarifTotalResa = this.reservationService.tarufTotalReservation;
    this.displayLoader = true;
    this.reservationService.enregistrerReservation(this.chambre.id, this.dateSelected?.dateDebut,
      this.dateSelected?.dateFin, this.client?.firstName, this.client?.lastName, this.client?.email,
      this.client?.telephone, this.nombrePersonne, this.nombrePetitDejeuner, this.tarifTotalResa).pipe(
        tap(data => {
          this.envoiEmailConfirmation();
        }), takeUntil(this.ngUnsubscribe)
    ).subscribe(_=> {},
      error => {
        this.displayLoader = false;
        this.erreurService.setMessageErreur('Une erreur est survenue lors de la résevrations, mais votre paiement à été bien effectué. Veuillez-nous contacter au plus vite et nous excuser de ce problème.');
        this.router.navigate(['erreur-serveur']);
      });
  }

  envoiEmailConfirmation() {
    this.reservationService.envoiEmailConfirmation(this.client.lastName, this.client.firstName, this.client.email).pipe(
      tap(data => {
        this.requestSuccess = true;
        this.displayLoader = false
      },
    ), takeUntil(this.ngUnsubscribe)
    ).subscribe(_=> {},
      error => {
      this.displayLoader = false;
      this.erreurService.setMessageErreur("Une erreur est survenue lors de l'envoi de votre e-mail de confirmation. Veuillez nous contacter pour confirmer la réservation. Mais n'ayez crainte, votre réservation est déjà bien prise en compte !");
      this.router.navigate(['erreur-serveur']);
    })
  }


}
