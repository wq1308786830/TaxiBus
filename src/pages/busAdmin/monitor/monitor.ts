import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { App, NavController, ModalController, Platform } from 'ionic-angular';
import { BusAdminSearch } from '../search/search';
import { BusAdminBusCard } from '../buscard/buscard';
import { HomePage } from '../../main/home/home';

import { BusMarker } from '../../../beans/beans';
import { BusAdminService } from '../../../services/bus-admin-service';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';


@Component({
  templateUrl: 'monitor.html'
})
export class BusAdminMonitor implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('googlemap') googleMap;

  public busMarks: BusMarker[] = [];
  public gMap: GoogleMap;
  public bMapReady: boolean;
  public refreshTimer: number;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public busAdminService: BusAdminService,
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
          this.updateBuses();
        });
      }
    });
  }

  ionViewDidEnter() {
    if (this.bMapReady) {
      this.gMap.setDiv(this.googleMap.nativeElement);
      this.gMap.setClickable(true);
      this.clearAllMarker();
      this.updateBuses();
    }

    if (this.refreshTimer !== -1) {
      clearInterval(this.refreshTimer);
    }
    this.refreshTimer = setInterval(() => {
      this.updateBuses();
    }, 10000);
  }

  clearAllMarker() {
    if (this.bMapReady) {
      this.gMap.clear();
    }
    this.busMarks = [];
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

  updateBuses() {
    this.busAdminService.getRealTimeBus().subscribe(buses => {
      let tmpMarks: BusMarker[] = [];
      for (let item of buses) {
        let newMarker: BusMarker = new BusMarker();
        newMarker.gpsinfo = item;
        tmpMarks.push(newMarker);
        for (let index = 0; index < this.busMarks.length; index++) {
          if (item.carNo === this.busMarks[index].gpsinfo.carNo) {
            newMarker.marker = this.busMarks[index].marker;
            this.busMarks.splice(index, 1);
            break;
          }
        }
      }

      for (let bus of this.busMarks) {
        if (bus.marker) {
          bus.marker.remove();
        }
      }

      this.busMarks = tmpMarks;

      this.updateMarkers();
    });
  }

  updateMarkers() {
    if (!this.bMapReady) {
      return;
    }

    for (let entry of this.busMarks) {
      if (entry.marker) {
        entry.marker.setRotation(90 - parseFloat(entry.gpsinfo.direction));
        entry.marker.setPosition(new GoogleMapsLatLng(entry.gpsinfo.latitude, entry.gpsinfo.longitude));
      } else {
        let markerOptions: GoogleMapsMarkerOptions = {
          position: new GoogleMapsLatLng(entry.gpsinfo.latitude, entry.gpsinfo.longitude),
          title: entry.gpsinfo.carNo,
          rotation: 90 - parseFloat(entry.gpsinfo.direction),
          icon: {
            url: "assets/img/bus.png",
            size: { width: 60, height: 30 }
          }
        };

        this.gMap.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
          entry.marker = marker;
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
            let modal = this.modalCtrl.create(BusAdminBusCard, {
              gpsinfo: entry.gpsinfo,
              map: this.gMap
            });
            modal.present();
            this.gMap.setClickable(false);
          });
        });
      }
    }
  }

  onClickSearch(): void {
    this.navCtrl.push(BusAdminSearch)
  }

  onCLickBack() {
    this.theApp.getRootNav().setRoot(HomePage);
  }
}
