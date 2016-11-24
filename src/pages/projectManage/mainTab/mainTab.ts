import {Component} from "@angular/core";
import {ProjectManageRegister} from "../register/register";
import {Platform, NavParams, NavController} from "ionic-angular";
import {ProjectManageFile} from "../fileManage/fileManage";
import {ProjectManageVideo} from "../videoManage/videoManage";
import {ProjectManageRegManage} from "../regManage/regManage";

@Component({
  templateUrl: 'mainTab.html'
})
export class ProjectManageMainTab {

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public platform: Platform) {
  }

  onClickItem(index: number) {
    switch (index) {
      case 1:
        //todo:管理员进入ProjectManageRegister，非管理员进入ProjectManageRegister
        this.navCtrl.push(ProjectManageRegister);
        // this.navCtrl.push(ProjectManageRegManage);
        break;

      case 2:
        this.navCtrl.push(ProjectManageFile);
        break;

      case 3:
        this.navCtrl.push(ProjectManageVideo);
        break;
    }
  }
}
