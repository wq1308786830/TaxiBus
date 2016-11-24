import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectManageFileDetail} from "../fileDetail/fileDetail";

@Component({
  templateUrl: 'fileManage.html'
})
export class ProjectManageFile implements OnInit{

  public dateVal = new Date().toISOString();

  constructor(public navCtrl: NavController){

  }

  ngOnInit(): void {

  }

  fileDetail() {
    this.navCtrl.push(ProjectManageFileDetail);
  }
}
