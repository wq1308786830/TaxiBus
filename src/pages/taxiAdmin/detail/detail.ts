import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaxiAdminIllegal } from '../illegal/illegal';
import { TaxiAdminViolation } from '../violation/violation';
import { TaxiDriversBean, VehicleBean } from '../../../beans/beans';

@Component({
  templateUrl: 'detail.html'
})
export class TaxiAdminDetail {
  public driverInfo: TaxiDriversBean;
  public driverList: VehicleBean[] = [];

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.driverInfo = this.params.get("driverInfo");

    let driver: VehicleBean = new VehicleBean();
    driver.departName = this.driverInfo.departName;
    driver.driverName = this.driverInfo.firstDriverName;
    driver.driverNo = this.driverInfo.firstDriverNo;
    driver.driverPhone = this.driverInfo.firstDriverPhone;
    this.driverList.push(driver);

    if (this.driverInfo.secondDriverName) {
      let driver: VehicleBean = new VehicleBean();
      driver.departName = this.driverInfo.departName;
      driver.driverName = this.driverInfo.secondDriverName;
      driver.driverNo = this.driverInfo.secondDriverNo;
      driver.driverPhone = this.driverInfo.secondDriverPhone;
      this.driverList.push(driver);
    }
  }

  onClickTrafficViolation() {
    this.navCtrl.push(TaxiAdminIllegal, {carNo: this.driverInfo.carNo});
  }

  onCLickViolation() {
    this.navCtrl.push(TaxiAdminViolation, {carNo: this.driverInfo.carNo});
  }
}