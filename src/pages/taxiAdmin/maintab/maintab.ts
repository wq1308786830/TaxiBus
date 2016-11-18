import {Component} from '@angular/core';
import {TaxiAdminMonitor} from '../monitor/monitor';
import {TaxiAdminTaxilist} from '../taxilist/taxilist';
// import {TaxiAdminAnalyze} from '../analyze/analyze';

@Component({
  templateUrl: 'maintab.html'
})
export class TaxiAdminMainTab {

  public tab1Root: any;
  public tab2Root: any;
  // public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TaxiAdminMonitor;
    this.tab2Root = TaxiAdminTaxilist;
    // this.tab3Root = TaxiAdminAnalyze;
  }
}
