import {Component, AfterViewInit, OnDestroy, OnInit} from "@angular/core";
import {NavController, Platform, App, NavParams} from "ionic-angular";
import { PatorlBean } from '../../../beans/beans';

declare var AMap;

@Component({
  templateUrl: 'patrolDetail.html'
})
export class RoadSupportPatrolDetail implements OnInit, OnDestroy, AfterViewInit {

  public patorlInfo: PatorlBean;

  public bMapReady: boolean;
  public map;
  public polyline;
  public marker;

  public lngX;
  public latY;
  public lineArr = [];

  public pointList = [[116.397428, 39.90923], [116.387428, 39.91923], [116.367428, 39.960923], [116.377428, 39.93923]];

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public params: NavParams,
              public theApp: App) {
    this.bMapReady = false;
    this.patorlInfo = this.params.get("patorlInfo");
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

    // this.setPointArray();

    // this.map = new AMap.Map('patrolmap', {
    //   zoom: 14,
    //   center: [this.pointList[0][0], this.pointList[0][1]]
    // });

    // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
    //   this.map.addControl(new AMap.ToolBar());
    //   this.map.addControl(new AMap.Scale());
    // });

    // this.startRun();
  }

  setPointArray() {
    for (let i = 1; i < this.pointList.length; i++) {
      this.lngX = this.pointList[i][0];
      this.latY = this.pointList[i][1];
      this.lineArr.push(new AMap.LngLat(this.lngX, this.latY));
    }
  }

  completeEventHandler(x, y) {
    let icon = new AMap.Icon({
      image : 'assets/img/che.png',//24px*24px
      //icon可缺省，缺省时为默认的蓝色水滴图标，
      size : new AMap.Size(24,24)
    });
    this.marker = new AMap.Marker({
      map: this.map,
      //draggable:true, //是否可拖动
      position: new AMap.LngLat(x, y),//基点位置
      icon: icon, //marker图标，直接传递地址url
      offset: new AMap.Pixel(-26, -13), //相对于基点的位置
      autoRotation: true
    });
    //绘制轨迹
    this.polyline = new AMap.Polyline({
      map: this.map,
      path: this.lineArr,
      strokeColor: "#00A",//线颜色
      strokeOpacity: 1,//线透明度
      strokeWeight: 3,//线宽
      strokeStyle: "solid",//线样式
    });
  }

  startRun() {  //开始绘制轨迹
    this.completeEventHandler(this.pointList[0][0], this.pointList[0][1]);
    this.marker.moveAlong(this.lineArr, 80);     //开始轨迹回放
  }

}
