import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'alertSetting.html'
})
export class BusDriverAlertSetting implements OnInit {
  constructor(public navCtrl: NavController, public platform: Platform) {
  }

  ngOnInit() {
  }
}