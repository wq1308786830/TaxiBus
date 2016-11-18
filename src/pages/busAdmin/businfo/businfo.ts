import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BusAdminIllegal } from '../illegal/illegal';
import { BusAdminViolation } from '../violation/violation';
import { BusSimpleInfoBean } from '../../../beans/beans';
import { BusAdminInsurance} from "../busInsure/busInsurance";

@Component({
    templateUrl: 'businfo.html'
})
export class BusAdminBusInfo {
    public businfo: BusSimpleInfoBean;

    constructor(public navCtrl: NavController, public params: NavParams) {
        this.businfo = this.params.get("busInfo");
    }

    onClickItem(index) {
        switch (index) {
            case 1:
                this.navCtrl.push(BusAdminViolation);
                break;

            case 2:
                this.navCtrl.push(BusAdminIllegal);
                break;

            case 3:
                this.navCtrl.push(BusAdminInsurance);
                break;
        }
    }
}
