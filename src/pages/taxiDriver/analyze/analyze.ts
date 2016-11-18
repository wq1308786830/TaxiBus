import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, PopoverController, LoadingController } from 'ionic-angular';
import { Ng2Echart } from '../../../components/ng2-echart';
import { TaxiDriverMy } from '../my/my';
import { TaxiDriverService } from '../../../services/taxi-driver-service';
import { OperationAnlysisRespBean } from '../../../beans/beans';
import { LoginService } from '../../../services/login-service';
import { CommonService } from '../../../services/common-service';


@Component({
  templateUrl: 'analyze.html'
})
export class TaxiDriverAnalyze implements OnInit {
  eChartOptions: any;
  public operationInfo: OperationAnlysisRespBean;

  @ViewChild('operationchart') operationEchart: Ng2Echart;

  public curDateType: number;
  public startDayStr: string;
  public endDayStr: string;
  public driverNo: string;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public taxiDriverService: TaxiDriverService,
    public loadingCtrl: LoadingController,
    public loginService: LoginService,
    public commonService: CommonService,
    public popoverCtrl: PopoverController) {
    this.operationInfo = new OperationAnlysisRespBean();
    this.curDateType = 1;
    this.driverNo = this.loginService.accountInfo.id;
  }

  ngOnInit() {
    this.eChartOptions = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["收入"] },
      xAxis: { data: [] }, yAxis: {},
      series: [{ name: "收入", type: "bar", data: [] }]
    };

    let curTime = new Date();
    curTime.setMonth(curTime.getMonth() - 1);
    this.startDayStr = this.commonService.getDayTimeStr(curTime);

    let endDate = new Date();
    this.endDayStr = this.commonService.getDayTimeStr(endDate);
    this.updateDataAndRefresh();
  }

  onClickSelectDate() {
    let popover = this.popoverCtrl.create(TaxiDriverMy);
    popover.present();
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

    this.taxiDriverService.getOperationInfoAnlysisByDriverNo(
      this.curDateType, this.startDayStr, this.endDayStr, this.driverNo).subscribe(data => {
      if (data) {
        this.operationInfo = data;

        //update the chart
        this.eChartOptions.xAxis.data = [];
        this.eChartOptions.series[0].data = [];
        for (let item of data.barInfo) {
          this.eChartOptions.xAxis.data.push(item.resultStr);
          this.eChartOptions.series[0].data.push(item.orderCount);
        }


        if (this.operationEchart) {
          this.operationEchart.refresh();
        }
      }
        loader.dismiss();
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
      this.startDayStr = this.commonService.getDayTimeStr(date.start);
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

  doRefresh(refresher) {
    let curTime = new Date();
    curTime.setMonth(curTime.getMonth() - 1);
    this.startDayStr = this.commonService.getDayTimeStr(curTime);
    let endDate = new Date();
    this.endDayStr = this.commonService.getDayTimeStr(endDate);

    this.taxiDriverService.getOperationInfoAnlysisByDriverNo(this.curDateType, this.startDayStr, this.endDayStr, this.driverNo).subscribe(data => {
      if (data) {
        this.operationInfo = data;
        //update the chart
        this.eChartOptions.xAxis.data = [];
        this.eChartOptions.series[0].data = [];
        for (let item of data.barInfo) {
          this.eChartOptions.xAxis.data.push(item.resultStr);
          this.eChartOptions.series[0].data.push(item.orderCount);
        }
        if (this.operationEchart) {
          this.operationEchart.refresh();
        }
      }
      refresher.complete();
    });
  }
}
