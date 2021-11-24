import { Component, OnInit } from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  className = "deepblue"

  constructor(private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className)
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show')
  }
}
