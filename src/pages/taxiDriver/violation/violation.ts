import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViolationBean } from '../../../beans/beans';
import { TaxiDriverService } from '../../../services/taxi-driver-service';
import { LoginService } from '../../../services/login-service';
import { CommonService } from '../../../services/common-service';

@Component({
    templateUrl: 'violation.html'
})
export class TaxiDriverViolation {
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
        public taxiDriverService: TaxiDriverService) {
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

        this.taxiDriverService.getTaxiViolationsByDriverNo(
            this.driverNo,
            this.startDayStr,
            this.endDayStr,
            0, 0, 50)
            .subscribe(taxilist => {
              if (taxilist) {
                this.violationList = taxilist;
              }
                loader.dismiss();
              },
            error => {
                loader.dismiss();
            });
    }
  doRefresh(refresher) {
    this.taxiDriverService.getTaxiViolationsByDriverNo(this.driverNo, this.startDayStr, this.endDayStr, 0, 0, 50).subscribe(taxilist => {
        if (taxilist) {
          this.violationList = taxilist;
        }
        refresher.complete();
      });
  }
}
