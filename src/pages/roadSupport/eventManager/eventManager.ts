import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { RoadSupportEvDetail } from "../eventDetail/eventDetail";
import { RoadSupportService } from "../../../services/road-support-service";
import { RoadMgrEventBean } from '../../../beans/beans';

@Component({
  templateUrl: 'eventManager.html'
})
export class RoadSupportEvManager implements OnInit {

  items = "allItems";

  public allEvents: RoadMgrEventBean[];
  public doneEvents: RoadMgrEventBean[];
  public doingEvents: RoadMgrEventBean[];
  public waitingEvents: RoadMgrEventBean[];

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public roadSupportService: RoadSupportService) {
      this.allEvents = [];
      this.doneEvents = [];
      this.doingEvents = [];
      this.waitingEvents = [];
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();

    this.roadSupportService.getAllEventAllot(0, 10, "", "", "", "", "", -1).subscribe(events=>{
      if (events) {
        this.allEvents = events;
      }
      loader.dismiss();
    }, error=>{
      loader.dismiss();
    });

    this.roadSupportService.getAllEventAllot(0, 10, "", "", "", "", "", 0).subscribe(events=>{
      if (events) {
        this.doneEvents = events;
      }
    });

    this.roadSupportService.getAllEventAllot(0, 10, "", "", "", "", "", 1).subscribe(events=>{
      if (events) {
        this.doingEvents = events;
      }
    });

    this.roadSupportService.getAllEventAllot(0, 10, "", "", "", "", "", 2).subscribe(events=>{
      if (events) {
        this.waitingEvents = events;
      }
    });
  }


  eventDetail(event: any) {
    this.navCtrl.push(RoadSupportEvDetail, {eventInfo: event});
  }
}
