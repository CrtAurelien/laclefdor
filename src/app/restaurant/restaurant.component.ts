import {Component, OnInit} from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  className = "green"

  constructor(private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className)
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show')
  }

}
