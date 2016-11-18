import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IllegalBean } from '../../../beans/beans';
import { BusAdminService } from '../../../services/bus-admin-service';

@Component({
  templateUrl: 'illegal.html'
})
export class BusAdminIllegal {
  public illegalList: IllegalBean[] = [];

  constructor(public navCtrl: NavController,
              public busAdminService: BusAdminService) {
  }

  ngOnInit() {
    this.busAdminService.getBusIllegalsByBusNo("20160910111420", "20160910151420", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
    });
  }
  doRefresh(refresher) {
    this.busAdminService.getBusIllegalsByBusNo("20160910111420", "20160910151420", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
      refresher.complete();
    });
  }
}
