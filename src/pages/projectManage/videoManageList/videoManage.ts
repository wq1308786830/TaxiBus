import { Component, AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { NavController, Platform, App, NavParams } from "ionic-angular";
import { CameraBean, CameraVideoUrl } from "../../../beans/beans";
import { CommonHttpService } from "../../../services/common-http-service";

declare var AMap;
declare var HNBridge;

@Component({
  templateUrl: 'videoManage.html'
})
export class ProjectManageVideo implements OnInit, OnDestroy, AfterViewInit {

  public map: any;
  public marker: any;
  public markers: any = [];
  public result: any = {};

  public beatHeartTimer: number;
  public cameraList: CameraBean[];
  public curVideoUrl: CameraVideoUrl;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public platform: Platform,
    public theApp: App,
    public commonHttpService: CommonHttpService) {
    this.cameraList = this.params.get("cameralist");
    this.beatHeartTimer = -1;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.clearBeatHeart();
  }
  ngAfterViewInit(): void {

    this.map = new AMap.Map('videomap', {
      zoom: 14,
      zoomEnable: true,
      center: [116.470098, 39.992838]
    });

    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      this.map.addControl(new AMap.ToolBar());
      this.map.addControl(new AMap.Scale());
    });

    this.marker = new AMap.Marker({
      position: [116.470098, 39.992838],
      title: 'aaaaaa',
      draggable: false,
      map: this.map
    });
    this.markers.push(this.marker);

    for (let mark of this.markers) {
      AMap.event.addListener(mark, 'touchend', () => {
        console.log("aaaaaaaaaaaa");
        // this.startPlay();
      });
      AMap.event.addListener(mark, 'click', () => {
        // this.startPlay();
        console.log("aaaaaaaaaaaa");
      });
    }
  }


  getCameraValue(item) {
    return item.guId;
  }

  onCameraSel(ev) {
  }

  startBeatHeart() {
    if (this.beatHeartTimer !== -1) {
      clearInterval(this.beatHeartTimer);
    }

    this.sendBeatHeart();
    this.beatHeartTimer = setInterval(() => {
      this.sendBeatHeart();
    }, 10000);
  }

  sendBeatHeart() {
    this.commonHttpService.sendVideoBeatHeart(this.curVideoUrl.guId).subscribe(() => {
    });
  }

  clearBeatHeart() {
    if (this.beatHeartTimer !== -1) {
      clearInterval(this.beatHeartTimer);
      this.beatHeartTimer = -1;
    }
  }

  startPlay(item: any) {
    let curCamera: CameraBean = item;
    this.commonHttpService.getVideoPlayUrl(item.guId, "bus").subscribe(info => {
      if (info) {
        this.curVideoUrl = info;
        this.startBeatHeart();
        this.platform.ready().then(() => {
          HNBridge.playVideoUrl(this.curVideoUrl.playUrl, curCamera.channelName);
        });
      }
    });
  }

  onClickSearch() {
    this.result = {};
  }
}
