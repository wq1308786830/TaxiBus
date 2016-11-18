import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, App} from 'ionic-angular';
import {BusAdminBusInfo} from '../businfo/businfo';
import {BusViolationBean, DepartmentBean} from '../../../beans/beans';
import {BusAdminService} from '../../../services/bus-admin-service';
import {HomePage} from "../../main/home/home";

@Component({
  templateUrl: 'buslist.html'
})
export class BusAdminBusList implements OnInit {
  public buslist: BusViolationBean[] = [];

  public departments: DepartmentBean[] = [];
  public curDepartmentId: string;
  public curPage: number;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public busAdminService: BusAdminService,
              public theApp: App) {
    this.curDepartmentId = "";
    this.curPage = 0;
    this.busAdminService.getAllDepartments().subscribe(departList => {
      this.departments = departList;
    });
  }

  ngOnInit() {
    this.refreshList();
  }

  getColorname(level: number) {
    if (level > 2) {
      return 'danger';
    } else if (level > 1) {
      return 'secondary';
    } else {
      return 'default';
    }
  }

  getVisibel(level: number) {
    if (level === 0) {
      return 'none';
    } else {
      return 'block;'
    }
  }

  onClickBusItem(bus: BusViolationBean) {
    this.busAdminService.getCurrentDirverAndBusInfoByBusNo(bus.busNo).subscribe(info => {
      if (info) {
        let _info = info;
        this.navCtrl.push(BusAdminBusInfo, {busInfo: _info});
      }
    });
  }

  getnDepartmentValue(departmaent) {
    return departmaent.departmentid;
  }

  onDepartmentSel(ev: any) {
    this.refreshList();
  }

  refreshList() {
    let loader = this.loadingController.create({
      content: "加载中..."
    });
    loader.present();

    this.busAdminService.getBusAndViolationsByDepartId(this.curDepartmentId, this.curPage, 50).subscribe(data => {
      loader.dismiss();
      this.buslist = data;
    });
  }


  doRefresh(refresher) {
    this.busAdminService.getBusAndViolationsByDepartId(this.curDepartmentId, this.curPage, 50).subscribe(data => {
      if (data) {
        this.buslist = data;
      }
      refresher.complete();
    });
  }


  doInfinite(ev) {
  }

  onCLickBack() {
    this.theApp.getRootNav().setRoot(HomePage);
  }
}
