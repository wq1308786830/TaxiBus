import {Component, AfterViewInit, OnDestroy, OnInit} from "@angular/core";
import {NavController, Platform, App} from "ionic-angular";
import {AMapLocInfo} from "../../../beans/beans";
import {letProto} from "rxjs/operator/let";

declare var AMap;

@Component({
  templateUrl: 'changeLoc.html'
})
export class ProjectManageChangeLoc implements OnInit, OnDestroy, AfterViewInit {

  public map: any;
  public marker: any;
  public myInput: string = '';
  public positionList: AMapLocInfo[] = [];

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
      resizeEnable: true,
      center: [116.397428, 39.90923]
    });

    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      this.map.addControl(new AMap.ToolBar());
      this.map.addControl(new AMap.Scale());
    });

    this.markPosition("116.367428,39.90923");
  }

  markPosition(lonLat: string) {
    this.marker = new AMap.Marker({
      position: [parseFloat(lonLat.split(",")[0]), parseFloat(lonLat.split(",")[1])],//基点位置
      map: this.map,
      draggable:false //是否可拖动
    });
    this.map.setCenter(new AMap.LngLat(parseFloat(lonLat.split(",")[0]), parseFloat(lonLat.split(",")[1])));
  }


  onClickSearch(event) {
    AMap.service(["AMap.PlaceSearch"], function() {
      let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
        pageSize: 5,
        pageIndex: 1,
        city: "010", //城市
        map: this.map//,
        //panel: "panel"
      });
      //关键字查询
      placeSearch.search(this.myInput, function(status, result) {
        for (let i = 0; i < result.poiList.pois.length; i++) {
          this.positionList[i].id = result.poiList.pois[i].id;
          this.positionList[i].name = result.poiList.pois[i].name;
          this.positionList[i].location = result.poiList.pois[i].location;
          this.positionList[i].address = result.poiList.pois[i].address;
        }
      });
    });
  }
}
