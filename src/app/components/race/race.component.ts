import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import { RaceState, AthleteRaceState, Athlete } from '../../models/race';
import { ActivatedRoute } from '@angular/router';
import historicResults from '../../data/results/zurich2017';
import { HistoricResult } from '../../models/result';
import { DistanceService } from '../../services/distance.service';
import { CoordinateService } from '../../services/coordinate.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})

export class RaceComponent implements OnInit, OnDestroy {

  raceState: RaceState;
  racer1State$: Observable<AthleteRaceState>;
  racer1StateDebounced$: Observable<AthleteRaceState>;
  racer2State$: Observable<AthleteRaceState>;

  userName: 'Jonny';
  private STEP_LENGTH = 0.85; // m per step
  private TIME_TRAVEL_SPEED = 5; // min per km
  private MARATHON_DISTANCE = 42195;

  private raceStart: number; // unix timestamp
  private subscriptions: Subscription[] = [];
  private intervall: number;
  private racer2Subject: Subject<AthleteRaceState>;

  private racer2: HistoricResult;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,
    private distanceService: DistanceService, private coordinateService: CoordinateService) { }

  ngOnInit() {

    this.raceStart = (new Date()).getTime();

    const self = this;
    this.intervall = window.setInterval(() => {
      const now = new Date().getTime();
      const newDuration = Math.max((now - self.raceStart), 0);
      if (newDuration === 0) {
        self.raceStart = now;
      }
      self.tick(newDuration);
    }, 1000);

    this.racer1State$ = this.db.object(`/users/Jonny/steps`).map(s => {
      const stepCount: number = s.$value;
      const newDistance: number = Math.min(this.STEP_LENGTH * stepCount, this.MARATHON_DISTANCE);
      return {
        athlete: { name: 'You' },
        distance: newDistance,
        coordinate: this.coordinateService.interpolateCoordinate(newDistance),
        steps: stepCount
      };
    });

    this.racer1StateDebounced$ = this.racer1State$.debounce(() => Observable.timer(3000));

    this.subscriptions.push(this.route.queryParams.subscribe(paramsMap => {
      if (paramsMap['competition']) {
        const competition = historicResults.find(r => r.number === paramsMap['competition']);

        this.racer2 = competition;
        this.racer2Subject = new Subject();
        this.racer2State$ = this.racer2Subject;
        this.racer2Subject.next({
          athlete: { name: this.racer2.name },
          distance: 0,
          coordinate: this.coordinateService.interpolateCoordinate(0),
          steps: 0
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    window.clearInterval(this.intervall);
  }

  tick(newDuration) {
    this.raceState = { duration: newDuration };
    if (this.racer2) {
      const newDistance: number = Math.min(this.distanceService.distanceFromTime(newDuration, this.racer2), 42195);
      this.racer2Subject.next({
        athlete: {
          name: this.racer2.name,
        },
        distance: newDistance,
        coordinate: this.coordinateService.interpolateCoordinate(newDistance),
        steps: 0.001 * newDuration,
      });
    }
  }

  timeTravel(offset) {
    const offsetMinutes = offset / 1000 / 60;
    const timeTravelDistance = offsetMinutes / this.TIME_TRAVEL_SPEED * 1000;
    const deltaSteps = timeTravelDistance / this.STEP_LENGTH;
    const stepsObservable = this.db.object(`/users/Jonny/steps`).$ref
      .ref.transaction(steps => {
        if (steps === null) {
          return steps = deltaSteps;
        } else {
          return Math.max(steps + deltaSteps, 0);
        }
      });
    this.raceStart -= offset;
  }
}
