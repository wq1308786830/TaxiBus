import {Component, OnInit} from '@angular/core';
import {NavController, App, LoadingController} from 'ionic-angular';
import {BusDriverMy} from "../my/my";
import {BusDriverService} from "../../../services/bus-driver-service";
import {BusDriverDepartNoticeBean, BusDriverSafeNoticeBean} from "../../../beans/beans";


@Component({
  templateUrl: 'notices.html'
})
export class BusDriverNotices implements OnInit {
  notices = "safe";
  public depart: BusDriverDepartNoticeBean[] = [];
  public safeMsg: BusDriverSafeNoticeBean[] = [];

  constructor(public navCtrl: NavController, public theApp: App,
              public loadingController: LoadingController,
              public busDriverService: BusDriverService) {
  }

  ngOnInit() {

    // this.busDriverService.getBusDriverDepartmentTasks("A111").subscribe(depart => {
    //   this.depart = depart;
    // });
    //
    // this.busDriverService.getBusDriverSafeMsg("A112").subscribe(safeMsg => {
    //   this.safeMsg = safeMsg;
    // });

  }

  onCLickBack(pageAsign: string) {
    switch (pageAsign) {
      case "my":
        this.theApp.getRootNav().setRoot(BusDriverMy);
        break;
      case "2":
        this.theApp.getRootNav().setRoot(BusDriverMy);
        break;
    }
  }
  doRefresh(refresher) {
    this.busDriverService.getBusDriverDepartmentTasks("A111").subscribe(depart => {
      if (depart) {
        this.depart = depart;
      }
      refresher.complete();
    });

    this.busDriverService.getBusDriverSafeMsg("A112").subscribe(safeMsg => {
      if (safeMsg) {
        this.safeMsg = safeMsg;
      }
      refresher.complete();
    });
  }
}
