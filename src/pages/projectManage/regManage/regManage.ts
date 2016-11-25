import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectService} from "../../../services/project-service";
import {SignInfoBean} from "../../../beans/beans";

declare var AMap;

@Component({
  templateUrl: 'regManage.html'
})
export class ProjectManageRegManage implements OnInit{

  public dateVal = new Date().toISOString();
  public signData: SignInfoBean[] = [];

  constructor(public navCtrl: NavController, public projectService: ProjectService){

  }

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    let d = this.dateVal.split("T")[0].split("-");
    this.projectService.signManage(''+d[0]+d[1]+d[2]).subscribe( data => {
      if (data) {
        this.signData = data;
      }
    });
  }
}
