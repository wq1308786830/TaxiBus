import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CommonHttpService } from '../../../services/common-http-service';
import { AlertController } from 'ionic-angular';

declare var HNBridge;

@Component({
    templateUrl: 'password.html'
})
export class PasswordPage implements OnInit {
    public oldpassword: string;
    public newpassword1: string;
    public newpassword2: string;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public commonHttpService: CommonHttpService) {
    }

    ngOnInit() {
    }

    onClickLogin() {
        if (!this.oldpassword) {
            this.showAlertMsg('请输入原始密码.');
            return;
        }

        if (!this.newpassword1) {
            this.showAlertMsg('请输入新密码.');
            return;
        }

        if (!this.newpassword2) {
            this.showAlertMsg('请再次输入新密码.');
            return;
        }

        if (this.newpassword1 !== this.newpassword2) {
            this.showAlertMsg('两次输入的新密码不一致.');
            return;
        }

        let loader = this.loadingCtrl.create({
            content: "修改中..."
        });
        loader.present();

        this.commonHttpService.updatePassword(this.oldpassword, this.newpassword1).subscribe(() => {
            loader.dismiss();
            this.showAlertMsg('恭喜您，修改密码成功.');
        }, error => {
            loader.dismiss();
            if (error === "ErrorPassword") {
                this.showAlertMsg('您输入的密码不正确，请重新输入.');
            } else if (error === "ModifyPasswordError") {
                this.showAlertMsg('修改密码错误.');
            } else {
                this.showAlertMsg('网络连接出现错误，请稍后再试.');
            }
        });
    }

    showAlertMsg(msg: string) {
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            buttons: ['确定']
        });
        alert.present();
    }
}