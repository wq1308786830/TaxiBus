import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { TaxiSearchInfo } from '../../../beans/beans';
import { TaxiAdminSearchMap } from '../searchmap/searchmap';

@Component({
  templateUrl: 'search.html'
})
export class TaxiAdminSearch implements OnInit {
  public resultList: TaxiSearchInfo[] = [];
  public searchText: string;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public taxiAdminService: TaxiAdminService) {
  }

  ngOnInit() {
  }

  onClickKeyun() {
    this.taxiAdminService.getCarNoListByDepartmentId("A112", 0, 50).subscribe(itemList => {
      if (itemList) {
        this.resultList = itemList;
        this.navCtrl.push(TaxiAdminSearchMap, {
          key: "客运出租",
          id: this.searchText,
          data: this.resultList
        }, { animate: false });
      }
    });
  }

  onClickJida() {
    this.taxiAdminService.getCarNoListByDepartmentId("A111", 0, 50).subscribe(itemList => {
      if (itemList) {
        this.resultList = itemList;
        this.navCtrl.push(TaxiAdminSearchMap, {
          key: "吉达出租",
          id: this.searchText,
          data: this.resultList
        }, { animate: false });
      }
    });
  }

  onInsertText(ev: any) {
    this.searchText = ev.target.value;
  }

  onCLickSearch() {
    this.taxiAdminService.getCarNoListByCarno(this.searchText, 0, 50).subscribe(itemList => {
      if (itemList && itemList.length > 0) {
        this.resultList = itemList;
        this.navCtrl.push(TaxiAdminSearchMap, {
          key: this.searchText,
          id: this.searchText,
          data: this.resultList
        }, { animate: false });
      }
    });
  }
}
