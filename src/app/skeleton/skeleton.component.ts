import {AfterContentInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {BackgroundSwitchService} from "../shared/services/background-switch.service";
import {routeTransitionAnimations} from "./route-transition-animations";
import {FeaturesService} from "../shared/services/features.service";

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  animations: [routeTransitionAnimations]
})
export class SkeletonComponent implements OnInit, AfterContentInit {
  @ViewChild('outlet')
  routerOutlet: RouterOutlet;
  classDynamic;
  ngUnsubscribe = new Subject();

  constructor(private backgroundService: BackgroundSwitchService, private featureService: FeaturesService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
   /** this.featureService.getAllFeatures().subscribe(data => {
      this.featureService.listeFeatures = data;
    });*/
  }
  ngAfterContentInit(): void{
    this.backgroundService.getNomClasseSubject().pipe(
      tap(data => {
        if(this.classDynamic !== data) {
          this.classDynamic = data
          this.changeDetector.detectChanges();
          }
        }
      ), takeUntil(this.ngUnsubscribe)
    ).subscribe()
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }

}
