import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaftyInfoBean, IllegalBean, ViolationBean } from '../../../beans/beans';
import { TaxiDriverService } from '../../../services/taxi-driver-service';
import { LoginService } from '../../../services/login-service';
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
  public loginService: LoginService,
  public taxiDriverService: TaxiDriverService) {
    this.saftyInfo = new SaftyInfoBean();
  }

  ngOnInit() {
    this.taxiDriverService.getTaxiSaftyInfosByDriverNo(this.loginService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
    });

    this.taxiDriverService.getTaxiIllegalsByDriverNoForTwo(this.loginService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
    });

    this.taxiDriverService.getTaxiViolationsByDriverNoForTwo(this.loginService.accountInfo.id).subscribe(info => {
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
    this.taxiDriverService.getTaxiSaftyInfosByDriverNo(this.loginService.accountInfo.id).subscribe(info => {
      if (info && info.length > 0) {
        this.saftyInfo = info[0];
      }
      refresher.complete();
    });

    this.taxiDriverService.getTaxiIllegalsByDriverNoForTwo(this.loginService.accountInfo.id).subscribe(info => {
      if (info) {
        this.illegalList = info;
      }
      refresher.complete();
    });

    this.taxiDriverService.getTaxiViolationsByDriverNoForTwo(this.loginService.accountInfo.id).subscribe(info => {
      if (info) {
        this.violationList = info;
      }
      refresher.complete();
    });
  }
}
