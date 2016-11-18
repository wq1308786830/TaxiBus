import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusDriverService } from '../../../services/bus-driver-service';
import { DispatchplanRespBean } from '../../../beans/beans';

@Component({
    templateUrl: 'completeTask.html'
})
export class BusDriverCompleteTasks implements OnInit {
    public completeTasks: DispatchplanRespBean[];

    constructor(public navCtrl: NavController, public busDiverService: BusDriverService) {
    }

    ngOnInit() {
        this.busDiverService.getCompleteBusInfoByCondition(1, "", "", "").subscribe(data => {
          if (data) {
            this.completeTasks = data;
          }
        });
    }

    getDiffTime(task: DispatchplanRespBean) {
        if (task.differState === -1) {
            return "提前" + task.differTime + "min";
        } else if (task.differState === 1) {
            return "超时" + task.differTime + "min";
        } else {
            return " ";
        }
    }

    getTaskCor(task: DispatchplanRespBean) {
        if (task.differState === 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    getDiffTimeDisplay(task: DispatchplanRespBean) {
        if (task.differState === 0) {
            return 'none';
        } else {
            return 'block';
        }
    }
    doRefresh(refresher) {
      this.busDiverService.getCompleteBusInfoByCondition(1, "", "", "").subscribe(data => {
        if (data) {
          this.completeTasks = data;
        }
        refresher.complete();
      });
    }
}
