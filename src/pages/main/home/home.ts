import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, LoadingController } from 'ionic-angular';
import { TaxiAdminMainTab } from "../../taxiAdmin/maintab/maintab";
import { BusAdminMainTab } from "../../busAdmin/maintab/maintab";
import { PasswordPage } from "../password/password";
import { LoginService } from '../../../services/login-service';

declare var HNBridge;

@Component({
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public loginService: LoginService) {
    }

    ngOnInit() {
    }

    onClickItem(index: number) {
        switch (index) {
            case 1:
                this.navCtrl.setRoot(TaxiAdminMainTab);
                break;

            case 2:
                this.loginRoad();
                break;

            case 3:
                this.loginProject();
                break;

            case 4:
                this.navCtrl.setRoot(BusAdminMainTab);
                break;

            case 5:
                break;

            case 6:
                break;
        }
    }

    onCLickChangePassword() {
        this.navCtrl.push(PasswordPage);
    }

    loginProject() {
        let loader = this.loadingCtrl.create({
            content: "登录中..."
        });
        loader.present();
        this.loginService.project_login().subscribe(info => {
            loader.dismiss();
            this.platform.ready().then(() => {
                HNBridge.setAccountId(info.accountId, parseInt(info.roleId) === 9);
                HNBridge.gotoPage("project-main");
            }, error => {
                loader.dismiss();
            });
        });
    }

    loginRoad() {
        this.platform.ready().then(() => {
            HNBridge.gotoPage("road-main");
        });
    }
}