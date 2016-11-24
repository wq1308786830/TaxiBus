import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommonHttpService } from './common-http-service';
import { OperationAnlysisRespBean, IllegalBean, ViolationBean, SaftyInfoBean, DriverInfoBean, OperationRecordBean } from '../beans/beans';
import { Observable } from 'rxjs/Rx';

const API_BASEURL: string = CommonHttpService.API_HOST + "Taxi_app_web/json/";
const HEADER_CONTENT_TYPE: string = CommonHttpService.CONTENT_TYPE_APPLICATION;

@Injectable()
export class TaxiDriverService {
    constructor(public http: Http, public commonHttpService: CommonHttpService) {
    }

    /**
     * Get the taxi' operaton infomation
     * timeType:
     * startTime:
     * endTime:
     * driverno:
     */
    public getOperationInfoAnlysisByDriverNo(timeType: number, startTime: string,
        endTime: string, driverno: string): Observable<OperationAnlysisRespBean> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("timeType", timeType.toString());
        searchs.set("startTime", startTime);
        searchs.set("endTime", endTime);
        searchs.set("driverNo", driverno);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getOperationInfoAnlysisByDriverNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi driver's name and number
     * driverNo:
     */
    public getCarNoAndDriverName(): Observable<DriverInfoBean> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", this.commonHttpService.accountInfo.id);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getCarNoAndDriverName", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the record list
     * driverNo:
     */
    public getOperateRecords(driverNo: string): Observable<OperationRecordBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getOperateRecords", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the safity infomation
     * driverNo:
     */
    public getTaxiSaftyInfosByDriverNo(driverNo: string): Observable<SaftyInfoBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiSaftyInfosByDriverNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the latest tow illegal infomation
     * driverNo:
     */
    public getTaxiIllegalsByDriverNoForTwo(driverNo: string): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiIllegalsByDriverNoForTwo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }


    /**
     * Get the latest tow violation infomation
     * driverNo:
     */
    public getTaxiViolationsByDriverNoForTwo(driverNo: string): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiViolationsByDriverNoForTwo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the diver's illegal list
     * driverNo:
     */
    public getTaxiIllegalsByDriverNo(driverNo: string, searchStartTime: string,
        searchEndTime: string, dealType: number, pageIndex: number, pageCount: number): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("dealType", dealType.toString());
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiIllegalsByDriverNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the diver's volation list
     * driverNo:
     */
    public getTaxiViolationsByDriverNo(driverNo: string, searchStartTime: string,
        searchEndTime: string, dealType: number, pageIndex: number, pageCount: number): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("dealType", dealType.toString());
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiViolationsByDriverNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }
}
