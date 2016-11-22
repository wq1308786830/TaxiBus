import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportEvDetail} from "../eventDetail/eventDetail";
@Component({
  templateUrl: 'eventManager.html'
})
export class RoadSupportEvManager {

  items = "allItems";

  constructor(public navCtrl: NavController) {

  }

  eventDetail() {
    this.navCtrl.push(RoadSupportEvDetail);
  }
}
