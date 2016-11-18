import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { TaxiAdminDetail } from '../detail/detail';
import { TaxiInfo, RealTimeTaxiGpsBean } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { LoginService } from '../../../services/login-service';
import { GoogleMap } from 'ionic-native';
import { TaxiAdminVideo } from '../video/video';

@Component({
    selector: 'taxi-card',
    templateUrl: 'taxicard.html'
})
export class TaxiAdminTaxiCard implements OnInit, OnDestroy {
    public taxiInfo: TaxiInfo;
    public gMap: GoogleMap;
    public gpsInfo : RealTimeTaxiGpsBean;

    constructor(public navCtrl: NavController, 
                public viewCtrl: ViewController, 
                public params: NavParams,
                public loadingController: LoadingController,
                public loginService: LoginService,
                public taxiAdminServie: TaxiAdminService) {
        this.gpsInfo = this.params.get("gpsinfo");
        this.taxiInfo = new TaxiInfo();
        this.taxiInfo.carNo = this.gpsInfo.carNo;
        this.gMap = this.params.get("map");
    }

    ngOnInit() {
        this.taxiAdminServie.getTaxiBaseInfoByCarNo(this.taxiInfo.carNo).subscribe(info => {
            if (info) {
                this.taxiInfo = info;
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
        let loader = this.loadingController.create({
            content: "加载中...",
            duration: 5000
        });
        loader.present();
        
        this.taxiAdminServie.getTaxiBaseInfoAndFaultCountByCarNo(this.taxiInfo.carNo).subscribe(info => {
            loader.dismiss();
            if (info) {
                this.navCtrl.push(TaxiAdminDetail, {driverInfo: info});
            }
        });
    }

    onClickVideo() {
        let loader = this.loadingController.create({
            content: "获取视频列表中..."
        });
        loader.present();
        this.loginService.getVehicleCameraList(this.gpsInfo.carNo, "taxi").subscribe(info => {
            if (info && info.length > 0) {
                this.navCtrl.push(TaxiAdminVideo, { gpsinfo: this.gpsInfo, cameralist: info });   
            } else {

            }
            loader.dismiss();
        }, error => {
            loader.dismiss();
        });
    }
}

