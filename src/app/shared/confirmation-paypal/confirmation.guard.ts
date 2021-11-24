import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ReservationsService} from "../services/reservations.service";

@Injectable({
  providedIn: 'root'
})

export class ReservationGuard implements CanActivate {

  constructor(private reservationService: ReservationsService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let chambreReservee = this.reservationService.chambre;
    let dateReservee = this.reservationService.dateReservee;
    let nombrePErsonne = this.reservationService.nombrePersonneVoulu;
    let paiementOk = this.reservationService.paiementEffectue;
    if(!!chambreReservee && !!dateReservee && !!nombrePErsonne && paiementOk) {
      return true
    } else {
      this.router.navigate(['/hebergement']);
    }
  }

}
