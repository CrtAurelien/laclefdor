import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {ReservationsService} from "../services/reservations.service";
import {Subject} from "rxjs";
import {takeLast, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],

})
export class DatePickerComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  ngUnsubscribe = new Subject();
  dateClass = 'dateCustom'
  minDate = new Date(Date.now());
  constructor(private reservationService: ReservationsService) { }

  ngOnInit(): void {
    this.range.valueChanges.pipe(
      tap(data => {
        if(!!data.end) {
          this.reservationService.setListeDateSelectionnee(data.start, data.end);
        }
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.reservationService.setListeDateSelectionnee(this.range.controls['start'].value, this.range.controls['end'].value);
  }
}
