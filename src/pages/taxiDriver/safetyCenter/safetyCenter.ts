import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaftyInfoBean, IllegalBean, ViolationBean } from '../../../beans/beans';
import { TaxiDriverService } from '../../../services/taxi-driver-service';
import { CommonHttpService } from '../../../services/common-http-service';
import { TaxiDriverIllegal } from '../illegal/illegal';
import { TaxiDriverViolation } from '../violation/violation';

@Component({
  templateUrl: 'safetyCenter.html'
})
export class TaxiDriverSafetyCenter implements OnInit {
  saftyInfo: SaftyInfoBean;
  illegalList: IllegalBean[] = [];
  violationList: ViolationBean[] = [];

  constructor(public navCtrl: NavController,
  public commonHttpService: CommonHttpService,
  public taxiDriverService: TaxiDriverService) {
    this.saftyInfo = new SaftyInfoBean();
  }

  ngOnInit() {
    this.taxiDriverService.getTaxiSaftyInfosByDriverNo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
    });

    this.taxiDriverService.getTaxiIllegalsByDriverNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
    });

    this.taxiDriverService.getTaxiViolationsByDriverNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.violationList = info;
      }
    });
  }

  onClickAllIllegal() {
    this.navCtrl.push(TaxiDriverIllegal);
  }

  onClickAllViolation() {
    this.navCtrl.push(TaxiDriverViolation);
  }

  doRefresh(refresher) {
    this.taxiDriverService.getTaxiSaftyInfosByDriverNo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
      refresher.complete();
    });

    this.taxiDriverService.getTaxiIllegalsByDriverNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
      refresher.complete();
    });

    this.taxiDriverService.getTaxiViolationsByDriverNoForTwo(this.commonHttpService.accountInfo.id).subscribe(info => {
      if (info) {
        this.violationList = info;
      }
      refresher.complete();
    });
  }
}
