import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {RoadSupportRuleDetail} from "../ruleDetail/ruleDetail";
@Component({
  templateUrl: 'policyRule.html'
})
export class RoadSupportPolicyRule {
  constructor(public navCtrl: NavController) {

  }

  ruleDetail() {
    this.navCtrl.push(RoadSupportRuleDetail);
  }
}
