import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AthleteRaceState } from '../../models/race';

@Component({
  selector: 'app-runner-state',
  templateUrl: './runner-state.component.html',
  styleUrls: ['./runner-state.component.scss']
})
export class RunnerStateComponent implements OnInit {

  @Input()
  raceState: AthleteRaceState;

  constructor() { }

  ngOnInit() {
  }

}
