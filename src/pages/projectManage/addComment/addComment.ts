import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ProjectItemBean} from "../../../beans/beans";
import {ProjectService} from "../../../services/project-service";

@Component({
  templateUrl: 'addComment.html'
})
export class ProjectManageAddComment implements OnInit {

  public signFlag: boolean = true;
  public dateVal: any = {};
  public proData: ProjectItemBean = new ProjectItemBean();
  public locInfo: any = {};

  public signinComment: string = '';
  public signoutComment: string = '';

  constructor(public navCtrl: NavController, public params: NavParams,
              public projectService: ProjectService) {
    this.dateVal = params.get("dateVal");
    this.proData = params.get("proData");
    this.locInfo = params.get("locInfo");
  }

  ngOnInit(): void {

  }

  signCommit(signin: boolean): void {
    console.log("signin"+signin+ "projectCode fullDay signinAddr signinLonLat signinComment"+ this.proData.projectCode+ this.dateVal.fullDay,
      this.locInfo.signinAddr+ this.locInfo.signinLonLat+ this.signinComment);
    if (signin) {
      this.projectService.signin(this.proData.projectCode, this.dateVal.fullDay,
        this.locInfo.signinAddr, this.locInfo.signinLonLat, this.signinComment).subscribe(() => {
        console.log("签到成功");
      });
    } else {
      this.projectService.signout(this.proData.projectCode, this.dateVal.fullDay,
        this.locInfo.signinAddr, this.locInfo.signoutLonLat, this.signoutComment).subscribe(() => {
        console.log("签退成功");
      });
    }
  }
}
