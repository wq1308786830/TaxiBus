import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxiDriverMyOrderList } from '../myOrderList/myOrderList';
import { TaxiDriverAlertSetting } from '../alertSetting/alertSetting';
import { DriverInfoBean } from '../../../beans/beans';
import { TaxiDriverService } from '../../../services/taxi-driver-service';

@Component({
  templateUrl: 'my.html'
})
export class TaxiDriverMy implements OnInit {
  public myInfo: DriverInfoBean;

  constructor(public navCtrl: NavController, public taxiDriverService: TaxiDriverService) {
    this.myInfo = new DriverInfoBean();
  }

  ngOnInit() {
    this.taxiDriverService.getCarNoAndDriverName().subscribe(info => {
      if (info) {
        this.myInfo = info;
      }
    });
  }

  onClickMyOrder() {
    this.navCtrl.push(TaxiDriverMyOrderList);
  }

  onClickSetAlert() {
    this.navCtrl.push(TaxiDriverAlertSetting);
  }
}
