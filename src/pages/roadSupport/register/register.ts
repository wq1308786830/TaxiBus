
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportService} from "../../../services/road-support-service";
import {PatrolCarBean} from "../../../beans/beans";

@Component({
  templateUrl: 'register.html'
})
export class RoadSupportRegister implements OnInit{

  public carItems: PatrolCarBean[] = [];

  constructor(public navCtrl: NavController, public roadService: RoadSupportService){

  }

  ngOnInit(): void {
    this.roadService.getAllCar(0, 50).subscribe(data => {
      if (data) {
        this.carItems = data;
      }
    });
  }

  sign() {

  }
}
