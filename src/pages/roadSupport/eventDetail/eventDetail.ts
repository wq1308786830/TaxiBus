import {Component} from "@angular/core";
import { RoadMgrEventBean } from '../../../beans/beans';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'eventDetail.html'
})
export class RoadSupportEvDetail {

  items = "basic";
  public eventInfo: RoadMgrEventBean;

  constructor(public params: NavParams) {
    this.eventInfo = this.params.get("eventInfo");
  }
}
