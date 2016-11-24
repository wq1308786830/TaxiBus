import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {RoadSupportPatrolDetail} from "../patrolDetail/patrolDetail";
import {RoadSupportService} from "../../../services/road-support-service";
import { PatorlBean } from '../../../beans/beans';


@Component({
  templateUrl: 'patrolManage.html'
})
export class RoadSupportPatrolManage implements OnInit{
  public patorls: PatorlBean[];

  constructor(public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public roadService: RoadSupportService) {
  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    
    this.roadService.getAllPatorlRecord(0, 10, "", "", "", "", "").subscribe(patorl=>{
      if (patorl) {
        this.patorls = patorl;
      }
      loader.dismiss();
    }, error=>{
      loader.dismiss();
    });
  }

  patrolDetail(item: any) {
    this.navCtrl.push(RoadSupportPatrolDetail, {patorlInfo: item});
  }
}
