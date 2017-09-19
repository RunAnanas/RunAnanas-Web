import { Component, Input } from '@angular/core';
import { AthleteRaceState } from '../../models/race';

@Component({
  selector: 'app-race-runner-lane',
  templateUrl: './race-runner-lane.component.html',
  styleUrls: ['./race-runner-lane.component.scss']
})
export class RaceRunnerLaneComponent {

  @Input()
  raceState: AthleteRaceState;

  @Input()
  runner: string;

  constructor() { }

  percentageComplete(state: AthleteRaceState): number {
    return (state.distance / 42195) * 100;
  }

}
