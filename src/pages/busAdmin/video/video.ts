import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { BusAdminService } from '../../../services/bus-admin-service';
import { CommonHttpService } from '../../../services/common-http-service';
import { CameraBean, CameraVideoUrl, BusGpsBean } from '../../../beans/beans';

declare var AMap;
declare var HNBridge;

@Component({
    templateUrl: 'video.html'
})
export class BusAdminVideo implements OnInit {

    @ViewChild('playercontainer') playerElem;

    public beatHeartTimer: number;
    public bMapReady: boolean;
    public busGpsInfo: BusGpsBean;
    public busMarker: any;
    public cameraList: CameraBean[];
    public curVideoUrl: CameraVideoUrl;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public commonHttpService: CommonHttpService,
        public busAdminService: BusAdminService) {
        this.busGpsInfo = this.params.get("gpsinfo");
        this.cameraList = this.params.get("cameralist");
        this.beatHeartTimer = -1;
        this.bMapReady = false;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let map = new AMap.Map('googlemap', {
            zoom: 14,
            center: [this.busGpsInfo.longitude, this.busGpsInfo.latitude]
        });

        let icon = new AMap.Icon({
            image: 'assets/img/bus.png',
            animation: 'AMAP_ANIMATION_DROP',
            size: new AMap.Size(60, 30),
            imageSize: new AMap.Size(60, 30)
        });
        this.busMarker = new AMap.Marker({
            icon: icon,
            position: [this.busGpsInfo.longitude, this.busGpsInfo.latitude],
            title: this.busGpsInfo.carNo,
            map: map
        });
    }

    ngOnDestroy() {
        this.clearBeatHeart();
    }

    getCameraValue(item) {
        return item.guId;
    }

    onCameraSel(ev) {
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
        this.commonHttpService.getVideoPlayUrl(item.guId, "bus").subscribe(info => {
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