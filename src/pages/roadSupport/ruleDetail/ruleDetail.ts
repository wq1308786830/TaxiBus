/**
 * Created by wangcai on 2016/11/22.
 */
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'ruleDetail.html'
})
export class RoadSupportRuleDetail {
  public lawContent: string;

  constructor(public params: NavParams) {
    this.lawContent = this.params.get("lawcontent");
  }
}
