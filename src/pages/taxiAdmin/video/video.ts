import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { CommonHttpService } from '../../../services/common-http-service';
import { CameraBean, CameraVideoUrl, RealTimeTaxiGpsBean } from '../../../beans/beans';

declare var AMap;
declare var HNBridge;
declare var cyberplayer;

@Component({
    templateUrl: 'video.html'
})
export class TaxiAdminVideo implements OnInit {

    @ViewChild('playercontainer') playerElem;

    public beatHeartTimer: number;
    public bMapReady: boolean;
    public taxiGpsInfo: RealTimeTaxiGpsBean;
    public busMarker: any;
    public cameraList: CameraBean[];
    public curVideoUrl: CameraVideoUrl;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public platform: Platform,
        public commonHttpService: CommonHttpService,
        public taxiAdminService: TaxiAdminService) {
        this.taxiGpsInfo = this.params.get("gpsinfo");
        this.cameraList = this.params.get("cameralist");

        this.beatHeartTimer = -1;
        this.bMapReady = false;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let map = new AMap.Map('googlemap', {
            zoom: 14,
            center: [this.taxiGpsInfo.longitude, this.taxiGpsInfo.latitude]
        });

        let icon = new AMap.Icon({
            image: 'assets/img/taxi.png',
            animation: 'AMAP_ANIMATION_DROP',
            size: new AMap.Size(60, 30),
            imageSize: new AMap.Size(60, 30)
        });
        this.busMarker = new AMap.Marker({
            icon: icon,
            position: [this.taxiGpsInfo.longitude, this.taxiGpsInfo.latitude],
            title: this.taxiGpsInfo.carNo,
            map: map
        });
    }

    ngOnDestroy() {
        this.clearBeatHeart();
    }

    startBeatHeart() {
        if (this.beatHeartTimer !== -1) {
            clearInterval(this.beatHeartTimer);
        }

        this.sendBeatHeart();
        this.beatHeartTimer = setInterval(() => {
            this.sendBeatHeart();
        }, 10000);
    }

    sendBeatHeart() {
        this.commonHttpService.sendVideoBeatHeart(this.curVideoUrl.guId).subscribe(() => {
        });
    }

    clearBeatHeart() {
        if (this.beatHeartTimer !== -1) {
            clearInterval(this.beatHeartTimer);
            this.beatHeartTimer = -1;
        }
    }

    startPlay(item: any) {
        let curCamera: CameraBean = item;
        this.commonHttpService.getVideoPlayUrl(item.guId, "taxi").subscribe(info => {
            if (info) {
                this.curVideoUrl = info;
                this.startBeatHeart();
                this.platform.ready().then(() => {
                    HNBridge.playVideoUrl(this.curVideoUrl.playUrl, curCamera.channelName);
                });
            }
        });
    }
}