import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViolationBean } from '../../../beans/beans';
import { BusAdminService } from '../../../services/bus-admin-service';

@Component({
  templateUrl: 'violation.html'
})
export class BusAdminViolation {
  public illegalList: ViolationBean[] = [];

  constructor(public navCtrl: NavController,
              public busAdminService: BusAdminService) {
  }

  ngOnInit() {
    this.busAdminService.getBusViolationsByBusNo("20160910111420", "20160910151420", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
    });
  }
  doRefresh(refresher) {
    this.busAdminService.getBusViolationsByBusNo("20160910111420", "20160910151420", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
      refresher.complete();
    });
  }
}
