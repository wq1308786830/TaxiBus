import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {App, NavController, ModalController, Platform, NavParams} from 'ionic-angular';
import {BusSearchInfo, BusGpsBean} from '../../../beans/beans';
import {BusAdminService} from '../../../services/bus-admin-service';
import {BusAdminBusCard} from '../buscard/buscard';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker} from 'ionic-native';


@Component({
  templateUrl: 'searchmap.html'
})
export class BusAdminSearchMap implements OnInit, AfterViewInit {
  @ViewChild('googlemap') googleMap;

  public gMap: GoogleMap;
  public bMapReady: boolean;

  public title: string;
  public departMentId: string;
  public busList: BusSearchInfo[] = [];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public busAdminService: BusAdminService,
              public platform: Platform,
              public navParams: NavParams,
              public theApp: App) {
    this.bMapReady = false;
    this.title = navParams.get("key");
    this.busList = navParams.get("data");
    this.departMentId = navParams.get("id");
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.gMap = new GoogleMap(this.googleMap.nativeElement, {gestures: {scroll: true, rotate: false, zoom: true}});
      if (this.gMap._objectInstance) {
        this.gMap.setCenter(new GoogleMapsLatLng(this.busList[0].latitude, this.busList[0].longitude));
        this.gMap.setZoom(15);
        this.gMap.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.bMapReady = true;
          this.updateMarkers();
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

  updateMarkers() {
    if (!this.bMapReady) {
      return;
    }
    this.gMap.clear();

    for (let entry of this.busList) {
      let markerOptions: GoogleMapsMarkerOptions = {};
      if (entry.status == "空车") {
        markerOptions = {
          position: new GoogleMapsLatLng(entry.latitude, entry.longitude),
          title: entry.busno,
          rotation: 90 - parseFloat(entry.orientation),
          icon: {
            url: "assets/img/bus.png",       //todo:空车图片
            size: {width: 40, height: 20}
          }
        };
      } else {
        markerOptions = {
          position: new GoogleMapsLatLng(entry.latitude, entry.longitude),
          title: entry.busno,
          rotation: 90 - parseFloat(entry.orientation),
          icon: {
            url: "assets/img/bus.png",
            size: {width: 40, height: 20}
          }
        };
      }

      this.gMap.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
          let gpsinfo = new BusGpsBean();
          gpsinfo.carNo = entry.busno;
          gpsinfo.latitude = entry.latitude;
          gpsinfo.longitude = entry.longitude;
          let modal = this.modalCtrl.create(BusAdminBusCard, {
            gpsinfo: gpsinfo,
            map: this.gMap
          });
          modal.present();
          this.gMap.setClickable(false);
        });
      });
    }
  }

  onClickItem(bus) {
    this.gMap.setCenter(new GoogleMapsLatLng(bus.latitude, bus.longitude));
    this.updateMarkers();
  }
}
