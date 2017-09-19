import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { RaceState } from '../../models/race';

@Component({
  selector: 'app-race-state',
  templateUrl: './race-state.component.html',
  styleUrls: ['./race-state.component.scss']
})
export class RaceStateComponent {

  @Input()
  raceState: RaceState;

  @Output()
  onTimeTravel: EventEmitter<number> = new EventEmitter<number>();

  timeTravelStep = 15 * 60 * 1000; // 15min
}
