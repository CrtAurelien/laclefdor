import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Chambre} from "../../core/models/chambre";
import {ReservationsService} from "../../shared/services/reservations.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {DatePipe} from "@angular/common";
import {FormatageService} from "../../shared/services/formatage.service";

@Component({
  selector: 'app-formulaire-reservation',
  templateUrl: './formulaire-reservation.component.html',
  styleUrls: ['./formulaire-reservation.component.scss']
})
export class FormulaireReservationComponent implements OnInit {
  identite = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('',  [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    condition: new FormControl('', Validators.required),
    petitDejeuner: new FormControl(''),
    nombrePetitDejeuner: new FormControl('')
  });
  chambreReservee: Chambre;
  hasError = false;
  dateReservations;
  nombrePersonneReservation;
  tarifTotal;
  tarifNuit = 56;
  nombreNuit;
  showSuccess;
  showPaypalBtn = false;
  taxeDeSejour = 0.70;
  public payPalConfig: IPayPalConfig;

  constructor(private reservationService: ReservationsService, private router: Router, private datePipe: DatePipe, private formatageService: FormatageService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.chambreReservee = this.reservationService.chambre;
    this.dateReservations = this.reservationService.dateReservee;
    this.nombrePersonneReservation = this.reservationService.nombrePersonneVoulu;
    if (!this.chambreReservee) {
      this.router.navigate(['/hebergement']);
    } else {
      this.calculerTarif();
    }
  }

  reserverChambre() {
    this.hasError = false;
    if(this.identite.valid) {
      this.reservationService.tarufTotalReservation = this.tarifTotal;
      this.initConfig();
      this.showPaypalBtn = true;
    } else  {
      this.hasError = true;
    }
  }

  calculerTarif() {
    // Si il y a plus de deux personnes pour la reservation,
    let tarifNuitPourNombrePersonne;
    if(this.nombrePersonneReservation > 2) {
      tarifNuitPourNombrePersonne = this.tarifNuit + (6 * (this.nombrePersonneReservation - 2));
    } else {
      tarifNuitPourNombrePersonne = this.tarifNuit;
    }
    this.nombreNuit = this.reservationService.getDates(this.dateReservations.dateDebut, this.dateReservations.dateFin)
    const tarifTotalNuit = tarifNuitPourNombrePersonne * (this.nombreNuit.length - 1)
    const taxeSejourTotalPersonne = this.taxeDeSejour * this.nombrePersonneReservation;
    const taxeSejourTotal = taxeSejourTotalPersonne * (this.nombreNuit.length- 1)

      this.tarifTotal = tarifTotalNuit + taxeSejourTotal;


    this.tarifTotal = this.formatageService.retournerArrondiNSignificatif(this.tarifTotal);
  }

  private initConfig(): void {
    this.tarifTotal = this.formatageService.retournerArrondiNSignificatif(this.tarifTotal);
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.tarifTotal,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.tarifTotal,
                }
              }
            },
            items: [
              {
                name: this.chambreReservee.name,
                quantity: '1',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.tarifTotal,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.showSuccess = true;
        this.reservationService.paiementEffectue = true;
        this.reservationService.client = {
          firstName: this.identite.controls['prenom'].value,
          lastName: this.identite.controls['nom'].value,
          email: this.identite.controls['email'].value,
          telephone: this.identite.controls['telephone'].value,
        };
        this.router.navigate(['/confirmation-reservation']);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.router.navigate(['erreur-technique']);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }



}
