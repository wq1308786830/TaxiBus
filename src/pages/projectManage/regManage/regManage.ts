import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";

declare var AMap;

@Component({
  templateUrl: 'regManage.html'
})
export class ProjectManageRegManage implements OnInit{

  public dateVal = new Date().toISOString();

  constructor(public navCtrl: NavController){

  }

  ngOnInit(): void {
  }
}
