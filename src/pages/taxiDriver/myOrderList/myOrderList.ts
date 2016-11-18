import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OperationRecordBean } from '../../../beans/beans';
import { TaxiDriverService } from '../../../services/taxi-driver-service';

@Component({
  templateUrl: 'myOrderList.html'
})
export class TaxiDriverMyOrderList implements OnInit {
  public orderList: OperationRecordBean[] = [];

  constructor(public navCtrl: NavController, public taxiDriverService: TaxiDriverService) {
  }

  ngOnInit() {
    this.taxiDriverService.getOperateRecords("driverNo").subscribe(info => {
      if (info) {
        this.orderList = info;
      }
    });

  }
  doRefresh(refresher) {
    this.taxiDriverService.getOperateRecords("driverNo").subscribe(info => {
      if (info) {
        this.orderList = info;
      }
      refresher.complete();
    });
  }
}
