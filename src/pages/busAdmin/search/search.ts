import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BusAdminService } from '../../../services/bus-admin-service';
import { BusSearchInfo, DepartmentBean } from '../../../beans/beans';
import { BusAdminSearchMap } from '../searchmap/searchmap';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'search.html'
})
export class BusAdminSearch implements OnInit {
  public resultList: BusSearchInfo[] = [];
  public leftList: DepartmentBean[] = [];
  public rightList: DepartmentBean[] = [];
  public departList: DepartmentBean[] = [];
  public searchText: string;

  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public busAdminService: BusAdminService) {
    this.searchText = "搜索";
  }

  ngOnInit() {
    this.busAdminService.getAllDepartments().subscribe(departList => {
      if (departList) {
        this.departList = departList;
        for (let index = 0; index < departList.length; index++) {
          if (index % 2 === 0) {
            this.leftList.push(this.departList[index]);
          } else {
            this.rightList.push(this.departList[index]);
          }
        }
      }
    });
  }

  onClickDepart(depart: any) {
    this.busAdminService.getBusesByDepartId(depart.departmentid, 0, 50).subscribe(itemList => {
      if (itemList && itemList.length > 0) {
        this.resultList = itemList;
        this.navCtrl.push(BusAdminSearchMap, {
          key: depart.departname,
          id: depart.departmentid,
          data: this.resultList
        }, { animate: false });
      } else {
        this.showAlertMsg("对不起，没有搜到相关车辆信息！");
      }
    });
  }

  onInsertText(ev: any) {
    this.searchText = ev.target.value;
  }

  onCLickSearch() {
    this.busAdminService.getBusByBusNo(this.searchText, 0, 50).subscribe(itemList => {
      if (itemList && itemList.length > 0) {
        this.resultList = itemList;
        this.navCtrl.push(BusAdminSearchMap, {
          key: this.searchText,
          id: this.searchText,
          data: this.resultList
        }, { animate: false });
      } else {
        this.showAlertMsg("对不起，没有搜到相关车辆信息！");
      }
    });
  }

  showAlertMsg(msg: string) {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }
}
