import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, Content, LoadingController, Platform } from 'ionic-angular';
import { CommonHttpService } from '../../../services/common-http-service';
import { CommonService } from '../../../services/common-service';
import { StationCameraBean, CameraVideoUrl } from '../../../beans/beans';

declare var HNBridge;

@Component({
  templateUrl: 'mainPage.html'
})
export class RealMonitorMainpage implements OnInit {
  @ViewChild(Content) content: Content;

  private curSelElement: any = null;
  listType: any;
  public stationList: StationCameraBean[];
  public policeList: StationCameraBean[];
  private curStationPage: number;
  private curPolicePage: number;
  public beatHeartTimer: number;
  public curVideoUrl: CameraVideoUrl;

  constructor(public navCtrl: NavController,
    public theApp: App,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public commonService: CommonService,
    public commonHttpService: CommonHttpService) {
    this.listType = "station";
    this.stationList = [];
    this.policeList = [];
    this.curStationPage = 0;
    this.curPolicePage = 0;
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.commonHttpService.getStationCameraList(0, 50).subscribe(station => {
      if (station) {
        this.stationList = station;
      }
      loader.dismiss();
    }, error => {
      loader.dismiss();
    });

    this.commonHttpService.getPoliceCameraList(0, 50).subscribe(cameralist => {
      if (cameralist) {
        this.policeList = cameralist;
      }
    });
  }

  ngAfterViewInit() {
  }

  onClickItem(event) {
    if (event.currentTarget === this.curSelElement && this.curSelElement) {
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[1].style['display'] = 'inline-block';
        this.curSelElement.children[2].style['display'] = 'none';
      }
      this.curSelElement = null;
    } else {
      if (this.curSelElement && this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[1].style['display'] = 'inline-block';
        this.curSelElement.children[2].style['display'] = 'none';
      }

      this.curSelElement = event.currentTarget;
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'block';
        this.curSelElement.style['color'] = '#387ef5';
        this.curSelElement.children[1].style['display'] = 'none';
        this.curSelElement.children[2].style['display'] = 'inline-block';
      }

      this.content.scrollTo(0, this.curSelElement.offsetTop);
    }
  }

  onClickPliceItem(station: any) {

  }

  doInfinite(ev) {
    if (this.listType === 'station') {
      this.commonHttpService.getStationCameraList(++this.curStationPage, 50).subscribe(data => {
        if (data) {
          for (let i of data)
            this.stationList.push(i);
        }
        ev.complete();
      });
    } else if (this.listType === 'police') {
      this.commonHttpService.getPoliceCameraList(++this.curPolicePage, 50).subscribe(data => {
        if (data) {
          for (let i of data)
            this.policeList.push(i);
        }
        ev.complete();
      });
    }
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

  startPlay(camera: any, type: string) {
    let loader = this.loadingCtrl.create({
      content: "获取播放地址中..."
    });
    loader.present();
    this.commonHttpService.getVideoPlayUrl(camera.guId, type).subscribe(info => {

      if (info) {
        this.curVideoUrl = info;
        this.startBeatHeart();
        this.platform.ready().then(() => {
          HNBridge.playVideoUrl(this.curVideoUrl.playUrl, camera.channelName);
        });
      }
      loader.dismiss();
    }, error => {
      loader.dismiss();
      this.commonService.showAlertMsg(error);
    });
  }
}