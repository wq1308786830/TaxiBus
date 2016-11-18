import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, App} from 'ionic-angular';
import {TaxiAdminDetail} from '../detail/detail';
import {FaultCountBean} from '../../../beans/beans';
import {TaxiAdminService} from '../../../services/taxi-admin-service';
import {HomePage} from "../../main/home/home";

@Component({
  templateUrl: 'taxilist.html'
})
export class TaxiAdminTaxilist implements OnInit {
  listType = 'A112';
  public keyunTaxis: FaultCountBean[] = [];
  public jidaTaxis: FaultCountBean[] = [];


  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public taxiAdminService: TaxiAdminService,
              public  theApp: App) {
  }

  ngOnInit() {
    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A111", 0, 50).subscribe(taxiList => {
      if (taxiList) {
        this.jidaTaxis = taxiList;
      }
    });

    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A112", 0, 50).subscribe(taxiList => {
      if (taxiList) {
        this.keyunTaxis = taxiList;
      }
    });
  }

  onClickItem(taxi: FaultCountBean) {
    this.taxiAdminService.getTaxiBaseInfoAndFaultCountByCarNo(taxi.carNO).subscribe(info => {
      if (info) {
        this.navCtrl.push(TaxiAdminDetail, {driverInfo: info});
      }
    });
  }

  onCLickBack() {
    this.theApp.getRootNav().setRoot(HomePage);
  }

  doRefresh(refresher) {
    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A111", 0, 50).subscribe(taxiList => {
      if (taxiList) {
        this.jidaTaxis = taxiList;
      }
      refresher.complete();
    });

    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A112", 0, 50).subscribe(taxiList => {
      if (taxiList) {
        this.keyunTaxis = taxiList;
      }
      refresher.complete();
    });
  }
}
