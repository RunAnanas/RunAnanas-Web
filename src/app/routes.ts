import { Routes } from '@angular/router';
import { RaceComponent } from './components/race/race.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoaderComponent } from './components/loader/loader.component';

export const routes: Routes = [
  { path: 'race', component: RaceComponent },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: '**', component: LoaderComponent }
];
