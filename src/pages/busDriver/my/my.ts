import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {BusDriverAlertSetting} from '../alertSetting/alertSetting';
import {BusDriverMysalary} from '../mySalary/mySalary';
import {BusDriverNotices} from "../notices/notices";
import {BusDriverService} from "../../../services/bus-driver-service";
import {BusDriverNameAndNoBean} from "../../../beans/beans";


@Component({
  templateUrl: 'my.html'
})
export class BusDriverMy implements OnInit {

  public driverno: string;
  public driverInfo: BusDriverNameAndNoBean;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public busDriverService: BusDriverService) {
    this.driverInfo = new BusDriverNameAndNoBean();
  }

  ngOnInit() {
    this.busDriverService.getBusDriverNameAndBusNo().subscribe(info => {
      if (info) {
        this.driverInfo = info;
      }
    });
  }

  onClickMySalary() {
    this.navCtrl.push(BusDriverMysalary);
  }

  onClickAlertSetting() {
    this.navCtrl.push(BusDriverAlertSetting);
  }

  onClickNotices() {
    this.navCtrl.push(BusDriverNotices);
  }
}
