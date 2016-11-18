import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DepartmentBean, OperationAnlysisRespBean } from '../../../beans/beans';
import { Ng2Echart } from '../../../components/ng2-echart';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { CommonService } from '../../../services/common-service';

@Component({
  templateUrl: 'analyze.html'
})
export class TaxiAdminAnalyze implements OnInit {
  @ViewChild('orderEchart') orderEchart: Ng2Echart;

  public eChartOptions: any;
  public eChartOptionsWeigui: any;
  public mapOptions: any;

  public departments: DepartmentBean[] = [];

  public curDepartmentId: string;
  public curDateType: number;
  public startDayStr: string;
  public endDayStr: string;

  dataType;
  public operationInfo: OperationAnlysisRespBean;

  constructor(public navCtrl: NavController,
  public taxiAdminService: TaxiAdminService,
  public commonService: CommonService,
  public loadingCtrl: LoadingController) {
    this.operationInfo = new OperationAnlysisRespBean();
    this.curDepartmentId = "";
    this.curDateType = 1;

    this.taxiAdminService.getAllDepartmentBaseInfo().subscribe(departList => {
      if (departList) {
        this.departments = departList;
      }
    });
  }

  ngOnInit() {
    this.dataType = 'order';

    /**
     * The bus opereation analysis' chart info.
     */
    this.eChartOptions = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["收入"] },
      xAxis: { data: [] }, yAxis: {},
      series: [{ name: "收入", type: "bar", data: [] }],
      dataZoom: [{type: 'inside', start: 0, end: 100}]
    };

    let curTime = new Date();
    this.startDayStr = this.commonService.getDayTimeStr(curTime);
    this.endDayStr = this.commonService.getDayTimeStr(curTime);
    this.updateDataAndRefresh();


    this.eChartOptionsWeigui = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name: '违规类型',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '无证上岗' },
            { value: 310, name: '擅自提价' },
            { value: 234, name: '拒载乘客' }
          ]
        }
      ]
    };

    this.mapOptions = {
      center: {
        longitude: 116.404,
        latitude: 39.915
      }
    };
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

    this.taxiAdminService.getOperationInfoAnlysis(this.curDateType, this.startDayStr, this.endDayStr, this.curDepartmentId).subscribe(data => {
      if (data) {
        this.operationInfo.totalOpeCount = data.totalOpeCount;
        this.operationInfo.mileageRate = parseFloat(data.mileageRate.toFixed(2));
        this.operationInfo.totalFee = parseFloat(data.totalFee.toFixed(2));
        this.operationInfo.totalRun = parseFloat(data.totalRun.toFixed(2));
        this.operationInfo.totalEmptyDrive = parseFloat(data.totalEmptyDrive.toFixed(2));
        this.operationInfo.feeTaxiHundredKm = parseFloat(data.feeTaxiHundredKm.toFixed(2));
        this.operationInfo.mileageTaxiOne = parseFloat(data.mileageTaxiOne.toFixed(2));
        this.operationInfo.feeTaxiOne = parseFloat(data.feeTaxiOne.toFixed(2));

        //update the chart
        this.eChartOptions.xAxis.data = [];
        this.eChartOptions.series[0].data = [];
        for (let item of data.barInfo) {
          this.eChartOptions.xAxis.data.push(item.resultStr);
          this.eChartOptions.series[0].data.push(item.orderCount);
        }

        if (data.barInfo.length > 7) {
          this.eChartOptions.dataZoom[0].start = (data.barInfo.length - 7) * 100 / data.barInfo.length;
        } else {
          this.eChartOptions.dataZoom[0].start = 0;
        }


        if (this.orderEchart) {
          this.orderEchart.refresh();
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

}
