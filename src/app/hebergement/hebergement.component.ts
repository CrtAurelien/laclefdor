import { Component, OnInit } from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-hebergement',
  templateUrl: './hebergement.component.html',
  styleUrls: ['./hebergement.component.scss']
})
export class HebergementComponent implements OnInit {
  className = "red"

  constructor(private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className)
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show')
  }

}
