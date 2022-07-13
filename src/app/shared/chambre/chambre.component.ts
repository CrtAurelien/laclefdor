import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Chambre} from "../../core/models/chambre";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ReservationsService} from "../services/reservations.service";
import {subscribeOn, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {FeaturesService} from "../services/features.service";

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.scss']
})
export class ChambreComponent implements OnInit {
  // Correspond à la chambre a afficher / traiter
  @Input()
  chambre: Chambre
  // Modal
  modalRef?: BsModalRef;
  message?: string;
  messagePersonne?: string;
  ngUnsubscribe = new Subject();
  // Permet d'afficher ou non la chambre en fonction des dates selectionnées
  chambreNonDisponibleDateSelectionnee = false;
  chambreNeConvientPasPourNombrePersonne = false;
  // Liste de toutes les reservations de la chambre
  listeDateResa;
  // Liste de l'ensemble des dates
  listeDeTouteLesDates = [];
  dateSelectionnee;
  nombrePersonneSelectionne;
  @Input()
  typeTemplate: string;
  displayInfo = false;
  featureReservationIsOn = false;

  constructor(private modalService: BsModalService, private featureService: FeaturesService,
              private datePipe: DatePipe, private reservationService: ReservationsService, private router: Router) {
  }

  ngOnInit(): void {
    //this.featureReservationIsOn = this.featureService.featureIsOn('reservation');
    // On s'abonne au chamngement sur les dates selectionnées par le user
    this.reservationService.listeDateSelectionneeSubject.pipe(
      tap((data: any) => {
        // Quand on recupere des dates, on applique le filtre permettant de cacher la chambre si elle est deja reservée
        this.appliquerFiltreDateSelectionnee(data);
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
    // On s'abonne au chamgement sur le nombre de personnes selectionné par le user
    this.reservationService.nombrePersonneVOuluSubject.pipe(
      tap(data => {
        // On applique le filtre sur le nombre de personne
        this.appliquerFiiltreNombreDePersonne(data);
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  // Methode permettant d'ouvrir la modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // Méthode executé au clic sur le bouton de confirmation de la modal
  confirm(): void {
    // On verifie que des dates ont été selectionnées
    if(!!this.dateSelectionnee && !!this.nombrePersonneSelectionne) {
      // On set le cahmbre dans le service
      this.reservationService.chambre = this.chambre;
      // On set les dates dans le service
      this.reservationService.dateReservee = this.dateSelectionnee;
      // On navigue vers la page de reservation
      this.router.navigate(['reservation'])
    } else {
      // Dans le cas ou on a pas de date sélectionnez, on set le message d'erreur
      if(!this.dateSelectionnee) {
        this.message = 'Veuillez sélectionner des dates'
      }
      if(!this.nombrePersonneSelectionne) {
        this.messagePersonne = 'Veuillez sélectionner un nombre de personne'
      }

    }
    // On ferme la modal
    this.modalRef?.hide();

  }

  // Methode execute au clic sur le bouton annulation de la modal
  decline(): void {
    this.modalRef?.hide();
  }

  // Methode permettant d'effectuer le filtre de date selectionnée sur la chambre
  appliquerFiltreDateSelectionnee(data) {
    this.dateSelectionnee = data;
    this.chambre.isDisplay = true;
    // Des que des dates sont récuperées
    // On recupere l'ensemble des reservations pour la chambre en cours
    this.listeDateResa = this.reservationService.getReservationsForARoom(this.chambre);
    // On verifie si les dates on été changer pour executer la suite
    // on remet a zero la vraibale permettant d'afficher la chambre ou non
    this.chambreNonDisponibleDateSelectionnee = false;
    this.message = '';
    // On remet a zero la liste de toutes les dates
    this.listeDeTouteLesDates = [];
    // On parcours toutes les dates
    this.listeDateResa.forEach(resa => {
      // Pour chaque resa, on recupere l'ensemble des dates presente entre dateDebut et dateFin
      const allDates = this.reservationService.getDates(new Date(resa.startDate), new Date(resa.endDate));
      // On ajoute chacune de ces date a listeDeTouteLesDates
      allDates.forEach(date => {
        this.listeDeTouteLesDates.push(date);
      })
      // On recupere l'ensemble des dates entre la date selectionne debut et fin
      const allDateSelectionnee = this.reservationService.getDates(new Date(data.dateDebut), new Date(data.dateFin));
      // Dans le cas ou on a bien des reservation pour la chambre
      if(this.listeDeTouteLesDates.length > 0) {
        // On parcours toutes les dates de chaque reservation
        // Et on compare ces derniere a chaque date selectionnée
        // Si une date au minimum est en commun, on considere la chambre non disponible
        this.listeDeTouteLesDates.forEach(reservation => {
          allDateSelectionnee.forEach(dateDesiree => {
            const dateVoulue = this.datePipe.transform(dateDesiree, 'yyyy-MM-dd')
            const dateResa = this.datePipe.transform(reservation, 'yyyy-MM-dd')
            if(dateVoulue === dateResa) {
              this.chambreNonDisponibleDateSelectionnee = true
              this.chambre.isDisplay = false;
            }
          })
        })
      }
    })
  }

  // Methode permattant de verfier si la capacite de la
  // chambre est egale au nombre de personne desire par le use
  appliquerFiiltreNombreDePersonne(data) {
    this.nombrePersonneSelectionne = data;
    this.chambre.isDisplay = true;
    this.chambreNeConvientPasPourNombrePersonne = false;
    if (parseInt(data) > this.chambre.capacity) {
      this.chambre.isDisplay = false;
      this.chambreNeConvientPasPourNombrePersonne = true;
    }
  }

  showDetail() {
    this.displayInfo = !this.displayInfo
  }

}



