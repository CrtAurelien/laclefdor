import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HebergementComponent } from './hebergement/hebergement.component';
import { ContactComponent } from './contact/contact.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { ListeChambresComponent } from './shared/liste-chambres/liste-chambres.component';
import { ChambreComponent } from './shared/chambre/chambre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardComponent } from './shared/card/card.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import { FormulaireReservationComponent } from './hebergement/formulaire-reservation/formulaire-reservation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ListeDeroulanteComponent } from './shared/liste-deroulante/liste-deroulante.component';
import {NgxPayPalModule} from 'ngx-paypal';
import { Page404Component } from './page404/page404.component';
import { ConfirmationPaypalComponent } from './shared/confirmation-paypal/confirmation-paypal.component';
import {DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { EchecPaypalComponent } from './shared/echec-paypal/echec-paypal.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import {NgsRevealModule} from 'ngx-scrollreveal';
import { LoaderComponent } from './shared/loader/loader.component';
import { ErreurServeurComponent } from './erreur-serveur/erreur-serveur.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SkeletonComponent,
    HomeComponent,
    RestaurantComponent,
    HebergementComponent,
    ContactComponent,
    DatePickerComponent,
    ListeChambresComponent,
    ChambreComponent,
    CardComponent,
    FormulaireReservationComponent,
    ListeDeroulanteComponent,
    Page404Component,
    ConfirmationPaypalComponent,
    EchecPaypalComponent,
    MentionsLegalesComponent,
    LoaderComponent,
    ErreurServeurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsRevealModule,
    ModalModule.forRoot(),
    NgxPayPalModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['LL'],
        },
        display: {
          dateInput: 'DD-MM-YYYY',
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY',
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
