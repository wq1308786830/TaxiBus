import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViolationBean } from '../../../beans/beans';
import { LoginService } from '../../../services/login-service';
import { CommonService } from '../../../services/common-service';
import {BusDriverService} from "../../../services/bus-driver-service";

@Component({
    templateUrl: 'violation.html'
})
export class BusDriverViolation {
    public violationList: ViolationBean[] = [];

    public curDateType: number;
    public startDayStr: string;
    public endDayStr: string;
    public driverNo: string;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public loginService: LoginService,
        public loadingCtrl: LoadingController,
        public commonService: CommonService,
        public busDriverService: BusDriverService) {
    }

    ngOnInit() {
        let curTime = new Date();
        curTime.setMonth(curTime.getMonth() - 1);
        this.startDayStr = this.commonService.getDayTimeStr(curTime);

        let endDate = new Date();
        this.endDayStr = this.commonService.getDayTimeStr(endDate);

        this.updateDataAndRefresh();
    }

    updateDataAndRefresh() {

        //Show a loading dialog
        let loader = this.loadingCtrl.create({
            content: "加载中..."
        });
        loader.present();

        this.busDriverService.getBusViolationsByBusNo(this.driverNo).subscribe(taxilist => {
              if (taxilist) {
                this.violationList = taxilist;
                loader.dismiss();
              }
            },
            error => {
                loader.dismiss();
            });
    }
    doRefresh(refresher) {
      this.busDriverService.getBusViolationsByBusNo(this.driverNo).subscribe(taxilist => {
          if (taxilist) {
            this.violationList = taxilist;
          }
          refresher.complete();
        });
    }
}
