import { Component, OnInit, OnDestroy, Input, NgModule } from '@angular/core';
import { RaceState } from '../../models/race';
import { AthleteRaceState } from '../../models/race';

@Component({
  selector: 'app-maps-route',
  templateUrl: './maps-route.component.html',
  styleUrls: ['./maps-route.component.scss']
})
export class MapsRouteComponent implements OnInit {

  @Input()
  racer1State: AthleteRaceState;
  @Input()
  racer2State: AthleteRaceState;

  ngOnInit() { }
}
