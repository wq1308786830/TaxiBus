import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {RoadSupportRuleDetail} from "../ruleDetail/ruleDetail";
import { RoadSupportService } from "../../../services/road-support-service";
import { RoadMgrLawBean } from '../../../beans/beans';

@Component({
  templateUrl: 'policyRule.html'
})
export class RoadSupportPolicyRule implements OnInit {
  public laws: RoadMgrLawBean[];

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public roadSupportService: RoadSupportService) {
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();

    this.roadSupportService.getAllLawDetails(0, 10).subscribe(laws=>{
      if (laws) {
        this.laws = laws;
      }
      loader.dismiss();
    }, error=>{
      loader.dismiss();
    });
  }

  ruleDetail(law) {
    this.navCtrl.push(RoadSupportRuleDetail, {lawcontent: law.RoadLawContent});
  }
}
