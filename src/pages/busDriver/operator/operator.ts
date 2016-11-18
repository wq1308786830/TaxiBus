
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Ng2Echart } from '../../../components/ng2-echart';
import { DropdownController } from '../../../components/dropdown/dropdown';
import { BusDriverService } from '../../../services/bus-driver-service';
import { BusDriverOperationRespBean } from '../../../beans/beans';
import { BusDriverCompleteTasks } from '../completeTask/completeTask';
import { BusDriverNotices} from "../notices/notices";
import { CommonService } from '../../../services/common-service';

@Component({
  templateUrl: 'operator.html'
})
export class BusDriverOperator implements OnInit {
  eChartOptions: any;

  @ViewChild('operationchart') operationEchart: Ng2Echart;

  public operationInfo: BusDriverOperationRespBean;

  public curDateType: number;
  public startDayStr: string;
  public endDayStr: string;

  constructor(public navCtrl: NavController,
    public busDriverService: BusDriverService,
    public loadingCtrl: LoadingController,
    public commonService: CommonService,
    public dropdownCtrl: DropdownController) {
    this.operationInfo = new BusDriverOperationRespBean();
    this.curDateType = 1;
  }

  ngOnInit() {
    //The bus opereation analysis' chart info.
    this.eChartOptions = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["完成班次"] },
      xAxis: { data: [] }, yAxis: {},
      series: [{ name: "完成班次", type: "bar", data: [] }]
    };

    let curTime = new Date();
    this.startDayStr = this.commonService.getDayTimeStr(curTime);
    this.endDayStr = this.commonService.getDayTimeStr(curTime);
    this.updateDataAndRefresh();
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

    this.busDriverService.getOperationInfoAnlysis(this.curDateType, this.startDayStr, this.endDayStr).subscribe(data => {
      if (data) {
        this.operationInfo = data;
      }

      //update the chart
      this.eChartOptions.xAxis.data = [];
      this.eChartOptions.series[0].data = [];
      for (let item of data.barInfo) {
        this.eChartOptions.xAxis.data.push(item.textInfo);
        this.eChartOptions.series[0].data.push(item.completeCount);
      }

      loader.dismiss();

      if (this.operationEchart) {
        this.operationEchart.refresh();
      }
    },
    error => {
      loader.dismiss();
    });
  }

  onClickComplete() {
    this.navCtrl.push(BusDriverCompleteTasks);
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
  onClickNotices() {
    this.navCtrl.push(BusDriverNotices);
  }

  doRefresh(refresher) {
    let curTime = new Date();
    this.startDayStr = this.commonService.getDayTimeStr(curTime);
    this.endDayStr = this.commonService.getDayTimeStr(curTime);

    this.busDriverService.getOperationInfoAnlysis(this.curDateType, this.startDayStr, this.endDayStr).subscribe(data => {
      if (data) {
        this.operationInfo = data;
      }

      //update the chart
      this.eChartOptions.xAxis.data = [];
      this.eChartOptions.series[0].data = [];
      for (let item of data.barInfo) {
        this.eChartOptions.xAxis.data.push(item.textInfo);
        this.eChartOptions.series[0].data.push(item.completeCount);
      }

      if (this.operationEchart) {
        this.operationEchart.refresh();
      }
      refresher.complete();
    });
  }
}
