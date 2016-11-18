import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { App, NavController, ModalController, Platform } from 'ionic-angular';
import { TaxiAdminSearch } from '../search/search';
import { TaxiAdminTaxiCard } from '../taxicard/taxicard';
import { HomePage } from '../../main/home/home';

import { TaxiMarker } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';


@Component({
  templateUrl: 'monitor.html'
})
export class TaxiAdminMonitor implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('googlemap') googleMap;

  public taxiMarkers: TaxiMarker[] = [];
  public gMap: GoogleMap;
  public bMapReady: boolean;
  public refreshTimer: number;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public taxiAdminService: TaxiAdminService,
    public platform: Platform,
    public theApp: App) {
    this.bMapReady = false;
    this.refreshTimer = -1;
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
          this.clearAllMarker();
          this.updateTaxis();
        });
      }
    });
  }

  ionViewDidEnter() {
    if (this.bMapReady) {
      this.gMap.setDiv(this.googleMap.nativeElement);
      this.gMap.setClickable(true);
      this.clearAllMarker();
      this.updateTaxis();
    }

    if (this.refreshTimer !== -1) {
      clearInterval(this.refreshTimer);
    }
    this.refreshTimer = setInterval(() => {
      this.updateTaxis();
    }, 10000);
  }

  clearAllMarker() {
    if (this.bMapReady) {
      this.gMap.clear();
    }
    this.taxiMarkers = [];
  }

  ionViewWillLeave() {
    this.clearRefresher();
  }

  ngOnDestroy() {
    this.clearRefresher();
  }

  clearRefresher() {
    if (this.refreshTimer !== -1) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = -1;
    }
  }

  updateTaxis() {
    //this.gMap.fromPointToLatLng([0, 0]).then(location => {
    //});
    this.taxiAdminService.getAllCarRealtimeGPS().subscribe(taxis => {
      if (taxis) {
        let tmpMarks: TaxiMarker[] = [];
        for (let item of taxis) {
          let newMarker: TaxiMarker = new TaxiMarker();
          newMarker.gpsinfo = item;
          tmpMarks.push(newMarker);
          for (let index = 0; index < this.taxiMarkers.length; index++) {
            if (item.carNo === this.taxiMarkers[index].gpsinfo.carNo) {
              newMarker.marker = this.taxiMarkers[index].marker;
              this.taxiMarkers.splice(index, 1);
              break;
            }
          }
        }

        for (let bus of this.taxiMarkers) {
          if (bus.marker) {
            bus.marker.remove();
          }
        }

        this.taxiMarkers = tmpMarks;
        this.updateMarkers();
      }
    });
  }

  updateMarkers() {
    if (!this.bMapReady) {
      return;
    }

    for (let entry of this.taxiMarkers) {
      if (entry.marker) {
        entry.marker.setRotation(90 - parseFloat(entry.gpsinfo.direction));
        entry.marker.setPosition(new GoogleMapsLatLng(entry.gpsinfo.latitude, entry.gpsinfo.longitude));
      } else {
        let markerOptions: GoogleMapsMarkerOptions = {
          position: new GoogleMapsLatLng(entry.gpsinfo.latitude, entry.gpsinfo.longitude),
          title: entry.gpsinfo.carNo,
          rotation: 90 - parseFloat(entry.gpsinfo.direction),
          icon: {
            url: "assets/img/taxi.png",
            size: { width: 60, height: 30 }
          }
        };

        this.gMap.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
          entry.marker = marker;
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
            let modal = this.modalCtrl.create(TaxiAdminTaxiCard, { gpsinfo: entry.gpsinfo, map: this.gMap });
            modal.present();
            this.gMap.setClickable(false);
          });
        });
      }
    }
  }

  onClickSearch(): void {
    this.navCtrl.push(TaxiAdminSearch)
  }

  onCLickBack() {
    this.theApp.getRootNav().setRoot(HomePage);
  }
}
