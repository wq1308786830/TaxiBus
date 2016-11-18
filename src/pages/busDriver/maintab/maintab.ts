import { Component } from '@angular/core';

import { BusDriverSchedule } from '../schedule/schedule';
import { BusDriverOperator } from '../operator/operator';
import { BusDriverSecurity } from '../security/security';
import { BusDriverMy } from '../my/my';


@Component({
    templateUrl: 'maintab.html'
})
export class BusDriverMainTab {

    public tab1Root: any;
    public tab2Root: any;
    public tab3Root: any;
    public tab4Root: any;

    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = BusDriverSchedule;
        this.tab2Root = BusDriverOperator;
        this.tab3Root = BusDriverSecurity;
        this.tab4Root = BusDriverMy;
    }
}
