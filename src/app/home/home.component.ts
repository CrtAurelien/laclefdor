import { Component, OnInit } from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  className = "blue"

  constructor(private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className)
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show')
  }

}
