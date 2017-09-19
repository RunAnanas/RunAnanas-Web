import * as turf from '@turf/helpers';

export interface Athlete {
    name: string;
}

export interface RaceState {
    duration: number; // race duration in ms
}

export interface Coordinate {
    lng: number;
    lat: number;
}

export interface AthleteRaceState {
    athlete: Athlete;
    distance: number; // in meters
    coordinate: Coordinate;
    steps: number;
    heartRate?: number;
}
