import { Injectable } from '@angular/core';

import { HistoricResult } from '../models/result';

@Injectable()
export class DistanceService {

  constructor() { }

  // @params time in milliseconds
  // @returns distance in meters
  distanceFromTime(time: number, history: HistoricResult): number {
    const hours = time / 1000 / 60 / 60;
    const minutesPerKm = Number(history.meantime);
    const metersPerHour = (60 / minutesPerKm) * 1000;
    return Math.min(42195, hours * metersPerHour);
  }
}
