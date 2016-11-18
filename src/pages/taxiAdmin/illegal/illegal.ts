import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IllegalBean } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';

@Component({
  templateUrl: 'illegal.html'
})
export class TaxiAdminIllegal {
  public illegalList: IllegalBean[] = [];

  constructor(public navCtrl: NavController,
              public taxiAdminService: TaxiAdminService) {
  }

  ngOnInit() {
    this.taxiAdminService.getTaxiIllegalsByCarNo("20160910110830", "20160910150830", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
    });
  }
  doRefresh(refresher) {
    this.taxiAdminService.getTaxiIllegalsByCarNo("20160910110830", "20160910150830", "A123456", 0).subscribe(taxilist => {
      if (taxilist) {
        this.illegalList = taxilist;
      }
      refresher.complete();
    });
  }
}
