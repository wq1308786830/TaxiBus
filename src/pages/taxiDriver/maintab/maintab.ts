import { Component } from '@angular/core';

import { TaxiDriverAnalyze } from '../analyze/analyze';
import { TaxiDriverSafetyCenter } from '../safetyCenter/safetyCenter';
import { TaxiDriverMy } from '../my/my';


@Component({
  templateUrl: 'maintab.html'
})
export class TaxiDriverMainTab {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TaxiDriverAnalyze;
    this.tab2Root = TaxiDriverSafetyCenter;
    this.tab3Root = TaxiDriverMy;
  }
}
