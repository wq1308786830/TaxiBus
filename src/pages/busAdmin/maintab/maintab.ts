import { Component } from '@angular/core';
import { BusAdminMonitor } from '../monitor/monitor';
import { BusAdminBusList } from '../buslist/buslist';
// import { BusAdminAnalyze } from '../analyze/analyze';

@Component({
  templateUrl: 'maintab.html'
})
export class BusAdminMainTab {

  public tab1Root: any;
  public tab2Root: any;
  // public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = BusAdminMonitor;
    this.tab2Root = BusAdminBusList;
    // this.tab3Root = BusAdminAnalyze;
  }
}
