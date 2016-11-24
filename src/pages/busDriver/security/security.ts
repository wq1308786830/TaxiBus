import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SaftyInfoBean, IllegalBean, ViolationBean} from '../../../beans/beans';
import {BusDriverService} from '../../../services/bus-driver-service';
import {CommonHttpService} from '../../../services/common-http-service';
import {BusDriverNotices} from "../notices/notices";
import {BusDriverIllegal} from "../illegal/illegal";
import {BusDriverViolation} from "../violation/violation";


@Component({
  templateUrl: 'security.html'
})
export class BusDriverSecurity implements OnInit {

  saftyInfo: SaftyInfoBean;
  illegalList: IllegalBean[] = [];
  violationList: ViolationBean[] = [];

  constructor(public navCtrl: NavController, public busDriverService: BusDriverService, public commonHttpService: CommonHttpService) {
    this.saftyInfo = new SaftyInfoBean();
  }

  ngOnInit() {
    this.busDriverService.getBusSaftyInfosByBusNo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
    });

    this.busDriverService.getBusIllegalsByBusNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
    });

    this.busDriverService.getBusViolationsByBusNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.violationList = info;
      }
    });
  }

  onClickNotices() {
    this.navCtrl.push(BusDriverNotices);
  }

  onClickAllIllegal() {
    this.navCtrl.push(BusDriverIllegal);
  }

  onClickAllViolation() {
    this.navCtrl.push(BusDriverViolation);
  }

  doRefresh(refresher) {
    this.busDriverService.getBusSaftyInfosByBusNo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
      refresher.complete();
    });

    this.busDriverService.getBusIllegalsByBusNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
      refresher.complete();
    });

    this.busDriverService.getBusViolationsByBusNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.violationList = info;
      }
      refresher.complete();
    });
  }
}
