import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { IllegalBean } from '../../../beans/beans';
import { LoginService } from '../../../services/login-service';
import {BusDriverService} from "../../../services/bus-driver-service";
import { CommonService } from '../../../services/common-service';

@Component({
    templateUrl: 'illegal.html'
})
export class BusDriverIllegal {
    public illegalList: IllegalBean[] = [];

    public curDateType: number;
    public startDayStr: string;
    public endDayStr: string;
    public driverNo: string;

    constructor(public navCtrl: NavController,
        public loginService: LoginService,
        public loadingCtrl: LoadingController,
        public commonService: CommonService,
        public busDriverService: BusDriverService) {
        this.curDateType = 1;
        this.driverNo = this.loginService.accountInfo.id;
    }

    ngOnInit() {
        let curTime = new Date();
        curTime.setMonth(curTime.getMonth() - 1);
        this.startDayStr = this.commonService.getDayTimeStr(curTime);

        let endDate = new Date();
        this.endDayStr = this.commonService.getDayTimeStr(endDate);

        this.updateDataAndRefresh();
    }

    /**
       * Get the data from the remote server, and refresh the chart display.
       */
    updateDataAndRefresh() {

        //Show a loading dialog
        let loader = this.loadingCtrl.create({
            content: "加载中..."
        });
        loader.present();

        this.busDriverService.getBusIllegalsByBusNo(this.driverNo)
            .subscribe(busilist => {
              if (busilist) {
                this.illegalList = busilist;
                loader.dismiss();
              }
            },
            error => {
                loader.dismiss();
            });
    }

    doRefresh(refresher) {
      this.busDriverService.getBusIllegalsByBusNo(this.driverNo).subscribe(busilist => {
            if (busilist) {
              this.illegalList = busilist;
            }
          refresher.complete();
        });
    }
}
