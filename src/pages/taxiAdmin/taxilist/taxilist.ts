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
  public curPageJida: number;
  public curPageKeyun: number;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public taxiAdminService: TaxiAdminService,
              public  theApp: App) {
    this.curPageJida = 0;
    this.curPageKeyun = 0;
  }

  ngOnInit() {
    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A111", this.curPageJida, 50).subscribe(taxiList => {
      if (taxiList) {
        this.jidaTaxis = taxiList;
      }
    });

    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A112", this.curPageKeyun, 50).subscribe(taxiList => {
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

  doInfinite(ev) {
    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A111", ++this.curPageJida, 50).subscribe(taxiList => {
      if (taxiList) {
        for (let i of taxiList) {
          this.jidaTaxis.push(i);
        }
      }
      ev.complete();
    });

    this.taxiAdminService.getCarNoAndFaultCountByDepartmentId("A112", ++this.curPageKeyun, 50).subscribe(taxiList => {
      if (taxiList) {
        for (let j of taxiList) {
          this.keyunTaxis.push(j);
        }
      }
      ev.complete();
    });
  }
}
