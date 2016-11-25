/**
 * Created by wangcai on 2016/11/22.
 */
import {Component, OnInit} from "@angular/core";
import {ProjectFileContent, ProjectFileInfo} from "../../../beans/beans";
import {NavParams} from "ionic-angular";
import {ProjectService} from "../../../services/project-service";
@Component({
  templateUrl: 'fileDetail.html'
})
export class ProjectManageFileDetail implements OnInit{

  public dateVal = new Date().toISOString();
  public fileContent: ProjectFileContent = new ProjectFileContent();
  public proFileInfo: ProjectFileInfo = new ProjectFileInfo();

  constructor(public params: NavParams, public projectService: ProjectService) {
    this.proFileInfo = params.get("proFileInfo");
  }

  ngOnInit(): void {
    let d = this.dateVal.split("T")[0].split("-");
    this.projectService.getFileContent(''+d[0]+d[1]+d[2], this.proFileInfo).subscribe( data => {
      if (data) {

      }
    })
  }
}
