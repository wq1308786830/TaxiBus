import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ProjectDetailBean} from "../../../beans/beans";
import {ProjectManageVideo} from "../videoManage/videoManage";
import {ProjectService} from "../../../services/project-service";

@Component({
  templateUrl: 'videoManageList.html'
})
export class ProjectManageProjectList implements OnInit {

  public projectDetailList: ProjectDetailBean[] = [];


  constructor(public navCtrl: NavController, public params: NavParams,
            public projectService: ProjectService) {
    this.projectDetailList= params.get("projectDetailList");
  }

  ngOnInit(): void {

  }

  onProjectSelected(projectDetail: ProjectDetailBean): void {
    this.projectService.projectDetail = projectDetail;
    this.navCtrl.pop(ProjectManageVideo);
  }
}
