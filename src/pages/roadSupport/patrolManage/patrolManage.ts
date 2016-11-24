import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportPatrolDetail} from "../patrolDetail/patrolDetail";
import {RoadSupportService} from "../../../services/road-support-service";
@Component({
  templateUrl: 'patrolManage.html'
})
export class RoadSupportPatrolManage implements OnInit{



  constructor(public navCtrl: NavController, public roadService: RoadSupportService) {

  }

  ngOnInit(): void {

  }

  patrolDetail() {
    this.navCtrl.push(RoadSupportPatrolDetail);
  }
}
