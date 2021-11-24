import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ReservationsService} from "../../shared/services/reservations.service";

@Injectable({
  providedIn: 'root'
})

export class FormulaireGuard implements CanActivate {

  constructor(private reservationService: ReservationsService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let chambreReservee = this.reservationService.chambre;
    let dateReservee = this.reservationService.dateReservee;
    let nombrePErsonne = this.reservationService.nombrePersonneVoulu;
    if(!!chambreReservee && !!dateReservee && !!nombrePErsonne) {
      return true
    } else {
      this.router.navigate(['/hebergement']);
    }
  }

}
