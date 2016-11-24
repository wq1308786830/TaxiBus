
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportService} from "../../../services/road-support-service";
import {PatrolCarBean} from "../../../beans/beans";

@Component({
  templateUrl: 'register.html'
})
export class RoadSupportRegister implements OnInit{
  public choosedCar: any;
  public carItems: PatrolCarBean[] = [];

  constructor(public navCtrl: NavController, public roadService: RoadSupportService){

  }

  ngOnInit(): void {
  }

  sign() {

  }
}
