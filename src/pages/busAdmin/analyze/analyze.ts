import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Ng2Echart } from '../../../components/ng2-echart';
import { DropdownController } from '../../../components/dropdown/dropdown';
import { BusAdminService } from '../../../services/bus-admin-service';
import { BusOperationAnlysisBean, DepartmentBean } from '../../../beans/beans';
import { CommonService } from '../../../services/common-service';

@Component({
  templateUrl: 'analyze.html'
})
export class BusAdminAnalyze implements OnInit {
  eChartOptions: any;
  eChartOptionsSecurity: any;
  eChartOptionsWeigui: any;
  mapOptions: any;

  public departments: DepartmentBean[] = [];

  public curDepartmentId: string;
  public curDateType: number;
  public startDayStr: string;
  public endDayStr: string;

  @ViewChild('operationchart') operationEchart: Ng2Echart;

  dataType;
  public operationInfo: BusOperationAnlysisBean;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public busAdminService: BusAdminService,
              public loadingCtrl: LoadingController,
              public commonService: CommonService,
              public dropdownCtrl: DropdownController) {

    this.operationInfo = new BusOperationAnlysisBean();
    this.curDepartmentId = "";
    this.curDateType = 1;

    this.busAdminService.getAllDepartments().subscribe(departList => {
      if (departList) {
        this.departments = departList;
      }
    });
  }

  ngOnInit() {
    this.dataType = 'yunying';

    /**
     * The bus opereation analysis' chart info.
     */
    this.eChartOptions = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["完成班次"] },
      xAxis: { data: [] }, yAxis: {},
      series: [{ name: "完成班次", type: "bar", data: [] }],
      dataZoom: [{type: 'inside', start: 0, end: 100}]
    };

    let curTime = new Date();
    this.startDayStr = this.commonService.getDayTimeStr(curTime);
    this.endDayStr = this.commonService.getDayTimeStr(curTime);
    this.updateDataAndRefresh();

    /**
     * The security chart info.
     */
    this.eChartOptionsSecurity = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["完成班次"] },
      xAxis: { data: [] }, yAxis: {},
      series: [{ name: "完成班次", type: "bar", data: [] }],
      dataZoom: [{type: 'inside', start: 0, end: 100}]
    };

    this.mapOptions = { center: { longitude: 116.404, latitude: 39.915 } };
  }

  ngAfterViewInit() {
  }

  /**
   * Get the data from the remote server, and refresh the chart display.
   */
  updateDataAndRefresh() {

    //Show a loading dialog
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();

    this.busAdminService.getOperationInfoAnlysis(this.curDateType, this.startDayStr, this.endDayStr, this.curDepartmentId).subscribe(data => {
      if (data) {
        this.operationInfo = data;
        this.operationInfo.completeKM = parseFloat(data.completeKM.toFixed(2));
        this.operationInfo.emptyKM = parseFloat(data.emptyKM.toFixed(2));

        //update the chart
        this.eChartOptions.xAxis.data = [];
        this.eChartOptions.series[0].data = [];
        for (let item of data.barInfo) {
          this.eChartOptions.xAxis.data.push(item.resultStr);
          this.eChartOptions.series[0].data.push(item.completeBusCount);
        }

        if (data.barInfo.length > 7) {
          this.eChartOptions.dataZoom[0].start = (data.barInfo.length - 7) * 100 / data.barInfo.length;
        } else {
          this.eChartOptions.dataZoom[0].start = 0;
        }

        loader.dismiss();

        if (this.operationEchart) {
          this.operationEchart.refresh();
        }
      }

    },
      error => {
        loader.dismiss();
      });
  }

  /**
   * This function will be called when the user selected a date
   */
  datePickRes(date: any) {
    if (date.type === 'cumtom') {
      this.curDateType = 2;
      this.startDayStr = this.commonService.getDayTimeStr(date.start,);
      this.endDayStr = this.commonService.getDayTimeStr(date.end);
      this.updateDataAndRefresh();
    } else if (date.type === 'month') {
      this.curDateType = 1;
      this.endDayStr = this.commonService.getDayTimeStr(date.month);
      this.updateDataAndRefresh();
    } else if (date.type === 'year') {
      this.curDateType = 0;
      this.endDayStr = this.commonService.getDayTimeStr(date.year);
      this.updateDataAndRefresh();
    }
  }

  getnDepartmentValue(departmaent) {
    return departmaent.departmentid;
  }

  onDepartmentSel(ev: any) {
    this.updateDataAndRefresh();
  }
}
