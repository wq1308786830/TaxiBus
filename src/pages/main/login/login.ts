import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CommonHttpService } from '../../../services/common-http-service';
import { AlertController, Platform } from 'ionic-angular';

import { HomePage } from "../../main/home/home";
import { TaxiAdminMainTab } from "../../taxiAdmin/maintab/maintab";
import { TaxiDriverMainTab } from "../../taxiDriver/maintab/maintab";
import { BusAdminMainTab } from "../../busAdmin/maintab/maintab";
import { BusDriverMainTab } from '../../busDriver/maintab/maintab';
import { HNBridge } from '../../../components/ng2-hnbridge';

declare var md5;

@Component({
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
    public username: string;
    public password: string;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public platform: Platform,
        public commonHttpService: CommonHttpService) {
    }

    ngOnInit() {
        let username = localStorage.getItem("username");
        if (username) {
            this.username = username;
        }
    }

    onClickLogin() {
        if (this.username && this.password) {
            let loader = this.loadingCtrl.create({
                content: "登录中..."
            });
            loader.present();

            this.commonHttpService.login(this.username, this.password).subscribe(info => {
                if (info) {
                    localStorage.setItem("username", this.username);
                    this.getPushChannelId(info.account);
                    this.commonHttpService.accountInfo = info;
                    loader.dismiss();

                    let types: string[] = info.type.split(",");
                    if (types && types.length > 0) {
                        if (types.length > 1) {
                            this.navCtrl.setRoot(HomePage, { type: types });
                        } else if (types[0] === "10") {
                            this.navCtrl.setRoot(TaxiAdminMainTab);
                        } else if (types[0] === "11") {
                            this.navCtrl.setRoot(TaxiDriverMainTab);
                        } else if (types[0] === "20") {
                            this.navCtrl.setRoot(BusAdminMainTab);
                        } else if (types[0] === "21") {
                            this.navCtrl.setRoot(BusDriverMainTab);
                        } else if (types[0] === "30") {

                        } else if (types[0] === "31") {

                        } else if (types[0] === "40") {

                        } else if (types[0] === "50") {

                        } else {
                            this.showAlertMsg('请联系管理员开通相关权限.');
                        }
                    }
                }

            }, error => {
                loader.dismiss();
                if (error === "ErrorPassword") {
                    this.showAlertMsg('您输入的用户名和密码不匹配，请重新输入.');
                } else {
                    this.showAlertMsg('网络连接出现错误，请稍后再试.');
                }
            });
        } else {
            this.showAlertMsg('用户名和密码不能为空.');
        }
    }

    showAlertMsg(msg: string) {
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            buttons: ['确定']
        });
        alert.present();
    }

    getPushChannelId(accountid: string) {
        HNBridge.getPushChannelId(channelid => {
            this.commonHttpService.addMsgPushInfo4Traffic(channelid).subscribe(info => {

            });
        });
    }
}
