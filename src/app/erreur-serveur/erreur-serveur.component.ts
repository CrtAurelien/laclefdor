import { Component, OnInit } from '@angular/core';
import {ErreursService} from "../shared/services/erreurs.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-erreur-serveur',
  templateUrl: './erreur-serveur.component.html',
  styleUrls: ['./erreur-serveur.component.scss']
})
export class ErreurServeurComponent implements OnInit {
  messageErreur = "";
  ngUnsubscribe = new Subject()
  customClass ='deepblue'

  constructor(private erreurService: ErreursService, private backgroundService: BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.customClass);
    this.erreurService.getMessageErreur().pipe(
      tap(data => {
        this.messageErreur = data;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()

  }

}
