import { Component, OnInit, Input } from '@angular/core';
import { AthleteRaceState } from '../../models/race';

@Component({
  selector: 'app-race-impression',
  templateUrl: './race-impression.component.html',
  styleUrls: ['./race-impression.component.scss']
})
export class RaceImpressionComponent implements OnInit {

  images = [
    { distance: 0, path: './assets/img/track/km1.jpg' },
    { distance: 5000, path: './assets/img/track/km5.jpg' },
    { distance: 10000, path: './assets/img/track/km10.jpg' },
    { distance: 15000, path: './assets/img/track/km15.jpg' },
    { distance: 20000, path: './assets/img/track/km20_30.jpg' },
    { distance: 25000, path: './assets/img/track/km25.jpg' },
    { distance: 30000, path: './assets/img/track/km20_30.jpg' },
    { distance: 35000, path: './assets/img/track/km35.jpg' },
    { distance: 40000, path: './assets/img/track/km42.jpg' }
  ];

  @Input()
  raceState: AthleteRaceState;

  constructor() { }

  ngOnInit() {
  }

}
