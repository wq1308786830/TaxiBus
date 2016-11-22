import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportPatrolDetail} from "../patrolDetail/patrolDetail";
@Component({
  templateUrl: 'patrolManage.html'
})
export class RoadSupportPatrolManage {
  constructor(public navCtrl: NavController) {

  }

  patrolDetail() {
    this.navCtrl.push(RoadSupportPatrolDetail);
  }
}
