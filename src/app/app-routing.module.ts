import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkeletonComponent} from './skeleton/skeleton.component';
import {HomeComponent} from './home/home.component';
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {HebergementComponent} from "./hebergement/hebergement.component";
import {ContactComponent} from "./contact/contact.component";
import {FormulaireReservationComponent} from "./hebergement/formulaire-reservation/formulaire-reservation.component";
import {Page404Component} from './page404/page404.component';
import {ConfirmationPaypalComponent} from './shared/confirmation-paypal/confirmation-paypal.component';
import {EchecPaypalComponent} from "./shared/echec-paypal/echec-paypal.component";
import {FormulaireGuard} from "./hebergement/formulaire-reservation/formulaire.guard";
import {ReservationGuard} from "./shared/confirmation-paypal/confirmation.guard";
import {MentionsLegalesComponent} from './mentions-legales/mentions-legales.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    children: [
      { path: '',
        component: HomeComponent,
        data: { animationState: 'One' }
      },
      { path: 'restaurant',
        component: RestaurantComponent,
        data: { animationState: 'Two' }
      },
      { path: 'hebergement', component: HebergementComponent, data: { animationState: 'Three' }},
      { path: 'nous-situer', component: ContactComponent, data: { animationState: 'Four' }},
      { path: 'reservation', component: FormulaireReservationComponent, canActivate: [FormulaireGuard]},
      { path: '404', component: Page404Component},
      { path: 'mentions-legales', component: MentionsLegalesComponent},
      { path: 'confirmation-reservation', component: ConfirmationPaypalComponent, canActivate: [ReservationGuard]},
      { path: 'erreur-technique', component: EchecPaypalComponent},
      { path: '**', redirectTo: '/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
