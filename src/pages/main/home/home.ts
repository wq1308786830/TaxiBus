import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, LoadingController } from 'ionic-angular';
import { TaxiAdminMainTab } from "../../taxiAdmin/maintab/maintab";
import { BusAdminMainTab } from "../../busAdmin/maintab/maintab";
import { RealMonitorMainpage } from "../../realMonitor/mainPage/mainPage";
import { PasswordPage } from "../password/password";
import { CommonHttpService } from '../../../services/common-http-service';
import { ProjectService } from '../../../services/project-service';
import { RoadSupportMainTab } from '../../roadSupport/mainTab/mainTab';
import { ProjectManageMainTab } from "../../projectManage/mainTab/mainTab";

declare var HNBridge;

@Component({
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public commonHttpService: CommonHttpService,
        public projectService: ProjectService) {
    }

    ngOnInit() {
    }

    onClickItem(index: number) {
        switch (index) {
            case 1:
                this.navCtrl.setRoot(TaxiAdminMainTab);
                break;

            case 2:
                this.navCtrl.push(RoadSupportMainTab);
                break;

            case 3:
                this.gotoProject();
                break;

            case 4:
                this.navCtrl.setRoot(BusAdminMainTab);
                break;

            case 5:
                this.loginProject();
                break;

            case 6:
                break;

            case 7:
                this.navCtrl.push(RealMonitorMainpage);
                break;
        }
    }

    onCLickChangePassword() {
        this.navCtrl.push(PasswordPage);
    }

    gotoProject() {
        let loader = this.loadingCtrl.create({
            content: "登录中..."
        });
        loader.present();

        this.projectService.login().subscribe(info => {
            loader.dismiss();
            this.navCtrl.push(ProjectManageMainTab);
        }, error => {
            loader.dismiss();
        });
    }

    loginProject() {
        let loader = this.loadingCtrl.create({
            content: "登录中..."
        });
        loader.present();

        if (this.platform.is('android')) {
            HNBridge.loginProject(() => {
                loader.dismiss();
                HNBridge.gotoPage("project-main");
            }, () => {
            }, this.commonHttpService.accountInfo.account, this.commonHttpService.accountInfo.password);
        } else {
            this.projectService.login().subscribe(info => {
                loader.dismiss();
                this.platform.ready().then(() => {
                    HNBridge.setAccountId(info.accountId, parseInt(info.roleId) === 9);
                    HNBridge.gotoPage("project-main");
                    this.projectService.startGetLocation();
                });
            }, error => {
                loader.dismiss();
            });
        }
    }

    loginRoad() {
        this.platform.ready().then(() => {
            HNBridge.gotoPage("road-main");
        });
    }
}
