import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import historicResults from '../../data/results/zurich2017';
import { HistoricResult } from '../../models/result';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  searchResults: HistoricResult[];

  searchQuery: '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchResultsByName() {
    const lowerQ = this.searchQuery.toLowerCase();
    if (lowerQ.length === 0) {
      delete this.searchResults;
      return;
    }
    this.searchResults = historicResults
      .filter(r => r.name.toLowerCase().includes(lowerQ) || r.surname.toLowerCase().includes(lowerQ))
      .slice(0, 10);
  }

  selectCompetition(result: HistoricResult) {
    this.router.navigate(['/race'], { queryParams: { competition: result.number } });
  }

}
