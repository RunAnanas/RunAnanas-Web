import { Component, OnChanges, NgModule, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AthleteRaceState } from '../../models/race';
import { CoordinateService } from '../../services/coordinate.service';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})


export class StreetViewComponent implements OnChanges {


  @Input()
  raceState: AthleteRaceState;

  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private coordService: CoordinateService) {
  }

  ngOnChanges() {
    if (!this.raceState) {
      return;
    }
    const coord = this.coordService.interpolateCoordinate(this.raceState.distance);
    const bearing = this.coordService.findCurrentBearing(this.raceState.distance);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.instantstreetview.com/@' +
      coord.lat + ',' + coord.lng + ',' + bearing + 'h,-8.94p,0z');
  }



}
