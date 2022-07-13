import { Component, OnInit } from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";
import {FeaturesService} from "../shared/services/features.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featureResaIsOn = false;
  className = "blue"

  constructor(private backgroundService: BackgroundSwitchService, private featureService: FeaturesService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className);
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show');
    this.featureResaIsOn = this.featureService.featureIsOn('reservation');
  }

}
