import {Component, AfterViewInit, OnDestroy, OnInit} from "@angular/core";
import {NavController, Platform, NavParams} from "ionic-angular";
import {CameraVideoUrl, ProjectDetailBean, VideoPlayBean} from "../../../beans/beans";
import {CommonHttpService} from "../../../services/common-http-service";
import {ProjectService} from "../../../services/project-service";
import {ProjectManageProjectList} from "../videoManageList/videoManageList";

declare var AMap;
declare var HNBridge;

@Component({
  templateUrl: 'videoManage.html'
})
export class ProjectManageVideo implements OnInit, OnDestroy, AfterViewInit {

  public projectDetailList: ProjectDetailBean[] = [];
  public projectDetail: ProjectDetailBean = new ProjectDetailBean();
  public videoPlayList: VideoPlayBean[] = [];

  public map: any;
  public marker: any;
  public markers: any = [];

  public beatHeartTimer: number;
  public curVideoUrl: CameraVideoUrl;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public platform: Platform,
              public commonHttpService: CommonHttpService,
              public projectService: ProjectService) {
    this.beatHeartTimer = -1;
  }

  ngOnInit(): void {
    this.map = new AMap.Map('videomap', {
      zoom: 14,
      zoomEnable: true,
      center: [116.39,39.9]
    });

    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      this.map.addControl(new AMap.ToolBar());
      this.map.addControl(new AMap.Scale());
    });

    this.projectService.getProjectInfo('').subscribe(data => {
      if (data) {
        this.projectDetailList = data;
        this.markWithVideo(this.projectDetailList[0]);
      }
    });

    if (this.projectService.projectDetail) {
      this.markWithVideo(this.projectService.projectDetail);
    }
  }

  ngOnDestroy(): void {
    this.clearBeatHeart();
  }

  ngAfterViewInit(): void {

  }

  changeProject() {
    this.navCtrl.push(ProjectManageProjectList, {projectDetailList: this.projectDetailList});
  }

  markWithVideo(projectDetail: ProjectDetailBean) {
    let pLon = projectDetail.lonLat.split(";")[0].split(",")[0];
    let pLat = projectDetail.lonLat.split(";")[0].split(",")[1];

    this.map.setCenter(pLon, pLat);

    for (let i = 0; i < projectDetail.equips.length; i++) {
      this.projectService.getVideoPlayUrl(projectDetail.equips[i].equipmentCode).subscribe(video => {
        if (video) {
          this.videoPlayList[i] = video;
        }
      });

      this.markers[i] = new AMap.Marker({
        position: [projectDetail.equips[i].longitude, projectDetail.equips[i].longitude],
        draggable: false,
        map: this.map
      });
      AMap.event.addListener(this.markers[i], 'touchend', () => {
        console.log("touchend");
        this.startPlay(this.videoPlayList[i]);
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

  startPlay(item: VideoPlayBean) {
    this.startBeatHeart();
    this.platform.ready().then(() => {
      HNBridge.playVideoUrl(item.playUrl, item.tmpGuId);
    });
  }

}
