import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectManageChangeLoc} from "../changeLoc/changeLoc";
import {ProjectManageAddComment} from "../addComment/addComment";

declare var AMap;

@Component({
  templateUrl: 'register.html'
})
export class ProjectManageRegister implements OnInit, OnDestroy, AfterViewInit {

  public map;
  public markers = [];

  constructor(public navCtrl: NavController){

  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.map = new AMap.Map('amap', {
      zoom: 14,
      zoomEnable:false,
      dragEnable: false,
      center: [116.470098,39.992838]
    });

    this.markers = new AMap.Marker({
      position: [116.470098,39.992838],
      title: 'aaaaaa',
      draggable: false,
      map: this.map
    });
  }



  ngOnInit(): void {

  }

  signin() {
    this.navCtrl.push(ProjectManageAddComment);
  }
  signout() {
    this.navCtrl.push(ProjectManageAddComment);
  }

  changeLoc() {
    this.navCtrl.push(ProjectManageChangeLoc);
  }
}
