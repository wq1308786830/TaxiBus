import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BusAdminIllegal } from '../illegal/illegal';
import { BusAdminViolation } from '../violation/violation';
import { BusDetailInfoBean, BusSimpleInfoBean } from '../../../beans/beans';
import { BusAdminService } from '../../../services/bus-admin-service';

@Component({
  templateUrl: 'detail.html'
})
export class BusAdminBusDetail implements OnInit {
  public businfo: BusDetailInfoBean;
  public baseInfo: BusSimpleInfoBean;

  constructor(public navCtrl: NavController, public params: NavParams, public busAdminService: BusAdminService, ) {
    this.baseInfo = this.params.get("baseinfo");

    this.businfo = new BusDetailInfoBean();
  }

  ngOnInit() {
    this.busAdminService.getCurrentBusDetailInfo(this.baseInfo.busno).subscribe(info => {
      if (info) {
        this.businfo = info;
      }
    });
  }

  onClickTrafficViolation() {
    this.navCtrl.push(BusAdminIllegal);
  }

  onCLickViolation() {
    this.navCtrl.push(BusAdminViolation);
  }
}
