import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {ProjectManageChangeLoc} from "../changeLoc/changeLoc";
import {ProjectManageAddComment} from "../addComment/addComment";
import {ProjectService} from "../../../services/project-service";
import {HNBridge} from "../../../components/ng2-hnbridge";
import {ProjectSignTimesRepBean, ProjectItemBean, SignLocBean} from "../../../beans/beans";

declare var AMap;

@Component({
  templateUrl: 'register.html'
})
export class ProjectManageRegister implements OnInit, OnDestroy, AfterViewInit {

  public map: any;
  public markers: any = [];
  public signData: ProjectSignTimesRepBean = new ProjectSignTimesRepBean();
  public dateVal: any = {};
  public proData: ProjectItemBean[] = [];
  public locInfo: SignLocBean = new SignLocBean();
  public signFlag: boolean = true;
  public proDataItem: any = {};

  constructor(public navCtrl: NavController, public projectService: ProjectService,
              public platform: Platform) {
  }

  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      HNBridge.getLocation(location => {
        this.locInfo = location;
        this.map = new AMap.Map('amap', {
          zoom: 14,
          zoomEnable: false,
          dragEnable: false,
          center: [location.longitude, location.latitude]
        });

        this.markers = new AMap.Marker({
          position: [location.longitude, location.latitude],
          draggable: false,
          map: this.map
        });
      }, error => {
        console.log("签到定位失败！");
      });
    });
  }

  ngOnInit(): void {
    let dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let d = new Date();
    this.dateVal = {
      weekday: dayNames[d.getDay()],
      fullDay: d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate(),
      time: d.getHours() + ":" + d.getMinutes()
    };
    this.projectService.getSignTimes().subscribe(data => {
      if (data) {
        this.signData = data;
      }
    });

    let normalDate = new Date().toISOString().split("T")[0].split("-");
    console.log(normalDate);
    this.projectService.getProjectList(""+normalDate[0]+normalDate[1]+normalDate[2]).subscribe(data => {
      this.proData = data;
    })
  }

  ngOnDestroy(): void {

  }

  signin() {
    this.navCtrl.push(ProjectManageAddComment, {dateVal: this.dateVal, locInfo: this.locInfo, proData: this.proDataItem});
  }

  signout() {
    this.navCtrl.push(ProjectManageAddComment, {dateVal: this.dateVal, locInfo: this.locInfo, proData: this.proDataItem});
  }

  changeLoc() {
    this.navCtrl.push(ProjectManageChangeLoc);
  }
}
