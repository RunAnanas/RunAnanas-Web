import { Injectable } from '@angular/core';

import { Coordinate } from '../models/race';

import * as turf from '@turf/helpers';
import * as turfDistance from '@turf/distance';
import * as turfBearing from '@turf/bearing';
import * as turfDestination from '@turf/destination';

import zurich2014 from '../data/courses/zurich2014';

@Injectable()
export class CoordinateService {
  coordinates;
  distances;
  bearings = [];

  constructor() {
    this.coordinates = zurich2014.features[3].geometry.coordinates;
    this.distances = this.calculateDistances(this.coordinates[0]);
    this.bearings = this.calculateBearings(this.coordinates[0]);
  }

  calculateDistances(coordinates) {
    let totalDistance = 0;
    const distances = [totalDistance];
    for (let i = 1; i < coordinates.length; i++) {
      const segmentDistance = turfDistance(coordinates[i - 1], coordinates[i], 'kilometers') * 1000;
      totalDistance += segmentDistance;
      distances.push(totalDistance);
    }
    return distances;
  }

  calculateBearings(coordinates) {
    const bearings = [];
    for (let i = 0; i < coordinates.length - 1; i++) {
      const p1 = turf.point(coordinates[i]);
      const p2 = turf.point(coordinates[i + 1]);
      bearings.push(turfBearing(p1, p2));
    }
    // Use same direction for last point to ensure same array length
    bearings.push(bearings[length - 1]);
    return bearings;
  }

  interpolateCoordinate(targetDistance: number): Coordinate {
    const i = this.findCurrentIndex(targetDistance, this.distances);
    const interpolDistance = targetDistance - this.distances[i - 1];
    const bearing = this.bearings[i - 1];
    const p1 = turf.point(this.coordinates[0][i - 1]);
    const destination = turfDestination(p1, interpolDistance / 1000, bearing, 'kilometers');
    return {
      lng: destination.geometry.coordinates[0],
      lat: destination.geometry.coordinates[1]
    };
  }

  findCurrentIndex(targetDistance: number, distances: number[]): number {
    let i = 1;
    let currentDistance = distances[i];
    while (currentDistance < targetDistance && i < distances.length) {
      i++;
      currentDistance = distances[i];
    }
    return i;
  }

  findCurrentBearing(targetDistance: number): number {
    const i = this.findCurrentIndex(targetDistance, this.distances);
    return this.bearings[i - 1];
  }
}
