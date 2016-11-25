import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectManageFileDetail} from "../fileDetail/fileDetail";
import {ProjectService} from "../../../services/project-service";
import {ProjectFileInfo, FileInfo} from "../../../beans/beans";

@Component({
  templateUrl: 'fileManage.html'
})
export class ProjectManageFile implements OnInit{

  public dateVal = new Date().toISOString();
  public proFiles: ProjectFileInfo[] = [];

  constructor(public navCtrl: NavController, public projectService: ProjectService){

  }


  ngOnInit(): void {
    this.updateData();
  }

  fileDetail(fileInfo: FileInfo) {
    this.navCtrl.push(ProjectManageFileDetail, {fileInfo: fileInfo});
  }

  updateData() {
    let d = this.dateVal.split("T")[0].split("-");
    this.projectService.fileManage(''+d[0]+d[1]+d[2]).subscribe( data => {
      if (data) {
        this.proFiles = data;
      }
    });
  }
}
