
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { BusAdminVideo } from '../video/video';
import { BusAdminBusDetail } from '../detail/detail';
import { BusSimpleInfoBean, BusGpsBean } from '../../../beans/beans';
import { BusAdminService } from '../../../services/bus-admin-service';
import { LoginService } from '../../../services/login-service';
import { GoogleMap } from 'ionic-native';

@Component({
    selector: 'bus-card',
    templateUrl: 'buscard.html'
})
export class BusAdminBusCard implements OnInit, OnDestroy {
    public busInfo: BusSimpleInfoBean;
    public gMap: GoogleMap;
    public busGpsinfo: BusGpsBean;

    constructor(public navCtrl: NavController, 
                public viewCtrl: ViewController, 
                public params: NavParams,
                public busAdminService: BusAdminService,
                public loginService: LoginService,
                public loadingController: LoadingController) {
        
        this.busGpsinfo = this.params.get("gpsinfo");
        this.gMap = this.params.get("map");

        this.busInfo = new BusSimpleInfoBean();
        this.busInfo.busno = this.busGpsinfo.carNo;
    }

    ngOnInit() {
        this.busAdminService.getCurrentDirverAndBusInfoByBusNo(this.busInfo.busno).subscribe(info => {
            if (info) {
                this.busInfo = info;
            }
        });
    }

    ngOnDestroy() {
        this.gMap.setClickable(true);
    }

    onClickBd() {
        this.viewCtrl.dismiss('backDrop');
    }

    onClickDriverDetail() {
        this.navCtrl.push(BusAdminBusDetail, { baseinfo: this.busInfo });
    }

    onClickVideo() {
        let loader = this.loadingController.create({
            content: "获取视频列表中..."
        });
        loader.present();
        this.loginService.getVehicleCameraList(this.busGpsinfo.carNo, "bus").subscribe(info => {
            if (info && info.length > 0) {
                this.navCtrl.push(BusAdminVideo, { gpsinfo: this.busGpsinfo, cameralist: info });   
            } else {

            }
            loader.dismiss();
        }, error => {
            loader.dismiss();
        });
    }

    showAlert(message: string) {
    }
}

