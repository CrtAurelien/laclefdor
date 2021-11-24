import { Component, OnInit } from '@angular/core';
import {BackgroundSwitchService} from "../shared/services/background-switch.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  className = "deepblue"

  constructor(private backgroundService:BackgroundSwitchService) { }

  ngOnInit(): void {
    this.backgroundService.setNomClasseDynamique(this.className);
    let burgerMenu = document.getElementById('navbarSupportedContent');
    burgerMenu.classList.remove('show')
  }
}
