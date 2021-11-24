import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {ReservationsService} from "../services/reservations.service";

@Component({
  selector: 'app-liste-deroulante',
  templateUrl: './liste-deroulante.component.html',
  styleUrls: ['./liste-deroulante.component.scss']
})
export class ListeDeroulanteComponent implements OnInit {

    nombrePersonne =  new FormControl();
  ngUnsubscribe = new Subject();
  capacityPossible = [
    {capacity: '1', value: '1 personne'},
    {capacity: '2', value: '2 personnes'},
    {capacity: '3', value: '3 personnes'},
    {capacity: '4', value: '4 personnes'},
  ];

  constructor(private reservationService: ReservationsService) { }

  ngOnInit(): void {
    this.nombrePersonne.valueChanges.pipe(
      tap(data => {
        this.reservationService.setNombrePersonneVoulu(data);
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()

  }

}
