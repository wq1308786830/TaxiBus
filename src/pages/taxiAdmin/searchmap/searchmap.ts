import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { App, NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { TaxiAdminSearchResult } from '../searchresult/searchresult';
import { TaxiSearchInfo, RealTimeTaxiGpsBean } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { TaxiAdminTaxiCard } from '../taxicard/taxicard';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';


@Component({
    templateUrl: 'searchmap.html'
})
export class TaxiAdminSearchMap implements OnInit, AfterViewInit {
    @ViewChild('googlemap') googleMap;

    public gMap: GoogleMap;
    public bMapReady: boolean;

    public title: string;
    public departMentId: string;
    public taxiList: TaxiSearchInfo[] = [];

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public taxiAdminService: TaxiAdminService,
        public platform: Platform,
        public navParams: NavParams,
        public theApp: App) {
        this.bMapReady = false;
        this.title = navParams.get("key");
        this.taxiList = navParams.get("data");
        this.departMentId = navParams.get("id");
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.platform.ready().then(() => {
            this.gMap = new GoogleMap(this.googleMap.nativeElement, { gestures: { scroll: true, rotate: false, zoom: true } });
            if (this.gMap._objectInstance) {
                this.gMap.setCenter(new GoogleMapsLatLng(31.43, 119.48));
                this.gMap.setZoom(15);
                this.gMap.one(GoogleMapsEvent.MAP_READY).then(() => {
                    this.bMapReady = true;
                    this.updateTaxiMarkers();
                    this.showPopLayer();
                });
            }
        });
    }

    ionViewDidEnter() {
        if (this.bMapReady) {
            this.gMap.setDiv(this.googleMap.nativeElement);
            this.gMap.setClickable(true);
        }
    }

    updateTaxiMarkers() {
        if (!this.bMapReady) {
            return;
        }
        this.gMap.clear();

        for (let entry of this.taxiList) {
            let markerOptions: GoogleMapsMarkerOptions = {
                position: new GoogleMapsLatLng(entry.latitude, entry.longitude),
                title: entry.carNo,
                icon: {
                    url: "assets/img/taxi.png",
                    size: { width: 60, height: 30 }
                }
            };

            this.gMap.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
                marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
                    let gpsinfo = new RealTimeTaxiGpsBean();
                    gpsinfo.carNo = entry.carNo;
                    gpsinfo.latitude = entry.latitude;
                    gpsinfo.longitude = entry.longitude;
                    let modal = this.modalCtrl.create(TaxiAdminTaxiCard, { gpsinfo: gpsinfo, map: this.gMap });
                    modal.present();
                    this.gMap.setClickable(false);
                });
            });
        }
    }

    showPopLayer() {
        let modal = this.modalCtrl.create(TaxiAdminSearchResult, {
            key: this.title,
            id: this.departMentId,
            data: this.taxiList,
            map: this.gMap,
            mapControler: this
        });
        modal.present({ animate: false });
        this.gMap.setClickable(false);
    }
}
