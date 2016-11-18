import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BusInsuranceBean} from '../../../beans/beans';
import {BusAdminService} from '../../../services/bus-admin-service';

@Component({
  templateUrl: 'busInsurance.html'
})
export class BusAdminInsurance {
  public busNo: string;
  public busInsurance: BusInsuranceBean;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public busAdminService: BusAdminService) {
    // this.busNo = this.params.get("busNo");
  }

  ngOnInit() {
  //todo:有正式接口则打开注释代码
  //   this.busAdminService.getBusInsuranceInfo(this.busNo).subscribe(busInsurance => {
  //     this.busInsurance = busInsurance;
  //   });
  }
}
