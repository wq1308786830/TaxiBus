import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViolationBean } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { CommonService } from '../../../services/common-service';

@Component({
  templateUrl: 'violation.html'
})
export class TaxiAdminViolation {
  public violationList: ViolationBean[] = [];
  public carNo: string;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public commonService: CommonService,
    public taxiAdminService: TaxiAdminService) {
    this.carNo = this.params.get("carNo");
  }

  ngOnInit() {
    let startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 1);
    let startStr = this.commonService.getDayTimeStr(startTime);

    let endTime = new Date();
    let endStr = this.commonService.getDayTimeStr(endTime);

    this.taxiAdminService.getTaxiViolationsByCarNo(startStr, endStr, this.carNo, 0).subscribe(violationlist => {
      if (violationlist) {
        this.violationList = violationlist;
      }
    });
  }
  doRefresh(refresher) {
    let startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 1);
    let startStr = this.commonService.getDayTimeStr(startTime);

    let endTime = new Date();
    let endStr = this.commonService.getDayTimeStr(endTime);

    this.taxiAdminService.getTaxiViolationsByCarNo(startStr, endStr, this.carNo, 0).subscribe(violationlist => {
      if (violationlist) {
        this.violationList = violationlist;
      }
      refresher.complete();
    });
  }
}
