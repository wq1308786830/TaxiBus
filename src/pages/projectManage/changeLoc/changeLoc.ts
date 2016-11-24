import {Component, AfterViewInit, OnDestroy, OnInit} from "@angular/core";
import {NavController, Platform, App} from "ionic-angular";

declare var AMap;

@Component({
  templateUrl: 'changeLoc.html'
})
export class ProjectManageChangeLoc implements OnInit, OnDestroy, AfterViewInit {

  public map;
  public marker;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public theApp: App) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

    this.map = new AMap.Map('locmap', {
      zoom: 14,
      center: [116.397428, 39.90923]
    });

    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      this.map.addControl(new AMap.ToolBar());
      this.map.addControl(new AMap.Scale());
    });

    this.markPosition(116.367428, 39.90923);
  }

  markPosition(x: number, y: number) {
    this.marker = new AMap.Marker({
      position: [x, y],//基点位置
      map: this.map,
      draggable:false //是否可拖动
    });
    this.map.setCenter(new AMap.LngLat(x, y));
  }
}
