import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {BusTasksRespBean} from '../../../beans/beans';
import {BusDriverService} from '../../../services/bus-driver-service';
import {BusDriverNotices} from "../notices/notices";
import {CommonService} from '../../../services/common-service';


@Component({
  templateUrl: 'schedule.html'
})
export class BusDriverSchedule implements OnInit {
  public myTasks: BusTasksRespBean;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public commonService: CommonService,
              public busDriverService: BusDriverService) {
    this.myTasks = new BusTasksRespBean();
    this.myTasks.completeTasks = [];
    this.myTasks.readyTasks = [];
    this.myTasks.doingTasks = [];
  }

  ngOnInit() {
    let curTime = new Date();
    let curTimeStr = this.commonService.getDayTimeStr(curTime);

    this.busDriverService.searchBusTasksByDate(curTimeStr).subscribe(tasks => {
      if (tasks) {
        this.myTasks = tasks;
        if (!this.myTasks.completeTasks) {
          this.myTasks.completeTasks = [];
        }
        if (!this.myTasks.doingTasks) {
          this.myTasks.doingTasks = [];
        }
        if (!this.myTasks.readyTasks) {
          this.myTasks.readyTasks = [];
        }
      }
    });
  }

  onClickNotices() {
    this.navCtrl.push(BusDriverNotices);
  }

  showAlert(taskStatus) {
    if (taskStatus.realRunTime || taskStatus.realRunTime) {
      let d = taskStatus.realRunTime;
      let alert = this.alertCtrl.create({
        title: d.substr(0, 4) + "年" + d.substr(5, 2) + "月" + d.substr(8, 2) + "日" + d.substr(11, 2) + ":" + d.substr(14, 2) + "分发车",
        subTitle: taskStatus.startSite + "一一→" + taskStatus.endSite,
        buttons: ['确定']
      });
      alert.present();
    }
    if (taskStatus.planRunTime) {
      let d = taskStatus.planRunTime;
      let alert = this.alertCtrl.create({
        title: d.substr(0, 4) + "年" + d.substr(5, 2) + "月" + d.substr(8, 2) + "日" + d.substr(11, 2) + ":" + d.substr(14, 2) + "分发车",
        subTitle: taskStatus.startSite + "一一→" + taskStatus.endSite,
        buttons: ['确定']
      });
      alert.present();
    }
  }

  doRefresh(refresher) {
    let curTime = new Date();
    let curTimeStr = this.commonService.getDayTimeStr(curTime);

    this.busDriverService.searchBusTasksByDate(curTimeStr).subscribe(tasks => {
      if (tasks) {
        this.myTasks = tasks;
      }
      refresher.complete();
    });
  }
}
