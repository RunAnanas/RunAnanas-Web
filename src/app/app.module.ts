import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RaceComponent } from './components/race/race.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { MdButtonModule } from '@angular/material';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NguiMapModule } from '@ngui/map';

import { environment } from '../environments/environment';
import { RunnerStateComponent } from './components/runner-state/runner-state.component';
import { StreetViewComponent } from './components/street-view/street-view.component';

import { CoordinateService } from './services/coordinate.service';
import { DistanceService } from './services/distance.service';
import { RaceStateComponent } from './components/race-state/race-state.component';
import { TimePipe } from './pipes/time.pipe';
import { FormsModule } from '@angular/forms';
import { RaceRunnerLaneComponent } from './components/race-runner-lane/race-runner-lane.component';
import { MapsRouteComponent } from './components/maps-route/maps-route.component';
import { RaceImpressionComponent } from './components/race-impression/race-impression.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
    WelcomeComponent,
    RunnerStateComponent,
    StreetViewComponent,
    RaceStateComponent,
    TimePipe,
    RaceRunnerLaneComponent,
    MapsRouteComponent,
    RaceImpressionComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    MdButtonModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=' + environment.mapsApiKey
    }),
    FormsModule
  ],
  providers: [CoordinateService, DistanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
