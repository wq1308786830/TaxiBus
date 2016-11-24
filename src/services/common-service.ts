import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CommonService {

    constructor(public alertCtrl: AlertController,) {
    }

    getDayTimeStr(time: Date) {
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let day = time.getDay();

        let years = "0" + year.toString();
        years = years.substring(years.length-4);

        let months = "0" + month.toString();
        months = months.substring(months.length-2);

        let days = "0" + day.toString();
        days = days.substring(days.length-2);

        return years + months + days + '000000';
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