import {Component, AfterViewInit, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NavController, Platform, App} from "ionic-angular";

declare var AMap;

@Component({
  templateUrl: 'patrolDetail.html'
})
export class RoadSupportPatrolDetail implements OnInit, OnDestroy, AfterViewInit {

  public bMapReady: boolean;
  public beatHeartTimer: number;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public theApp: App) {
    this.bMapReady = false;
    this.beatHeartTimer = -1;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    let map = new AMap.Map('patrolmap', {
      zoom: 14,
      center: [116.397428, 39.90923]
    });
  }

}
