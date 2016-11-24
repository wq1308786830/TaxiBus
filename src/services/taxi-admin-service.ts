import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { CommonHttpService } from './common-http-service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {
    TaxiInfo, RealTimeTaxiGpsBean, FaultCountBean, TaxiDriversBean, TaxiSearchInfo,
    IllegalBean, ViolationBean, DepartmentBean, OperationAnlysisRespBean
} from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TaxiAdminService {
    static API_BASEURL: string = CommonHttpService.API_HOST + "Taxi_app_web/json/";
    static HEADER_CONTENT_TYPE: string = CommonHttpService.CONTENT_TYPE_APPLICATION;

    constructor(public http: Http, public app: App, public commonHttpService: CommonHttpService) {
    }

    /**
     * Get the realtime gps data
     */
    public getAllCarRealtimeGPS(): Observable<RealTimeTaxiGpsBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getAllCarRealtimeGPS", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get all the department
     */
    public getAllDepartmentBaseInfo(): Observable<DepartmentBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getAllDepartmentBaseInfo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi's basic infomation
     * carNo: plate number
     */
    public getTaxiBaseInfoByCarNo(carNo: string): Observable<TaxiInfo> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiBaseInfoByCarNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi's basic infomation and illegal count
     * carNo: plate number
     */
    public getTaxiBaseInfoAndFaultCountByCarNo(carNo: string): Observable<TaxiDriversBean> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiBaseInfoAndFaultCountByCarNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi list by department id
     * carNo: plate number
     */
    public getCarNoAndFaultCountByDepartmentId(departmentId: string, pageIndex: number, pageCount: number): Observable<FaultCountBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("departmentId", departmentId);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoAndFaultCountByDepartmentId", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi list by department id
     * carNo: plate number
     */
    public getCarNoListByDepartmentId(departId: string, pageIndex: number, pageCount: number): Observable<TaxiSearchInfo[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("departId", departId);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoListByDepartmentId", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi list by department id
     * carNo: plate number
     */
    public getCarNoListByCarno(carNo: string, pageIndex: number, pageCount: number): Observable<TaxiSearchInfo[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoListByCarno", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi' violation list
     * searchStartTime: yyyyMMddHHmmss
     * searchEndTime: yyyyMMddHHmmss
     * carNo: The plate number
     * dealType:
     */
    public getTaxiViolationsByCarNo(searchStartTime: string, searchEndTime: string,
        carNo: string, dealType: number): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("carNo", carNo);
        searchs.set("dealType", dealType.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiViolationsByCarNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get the taxi' illegal list
     * searchStartTime: yyyyMMddHHmmss
     * searchEndTime: yyyyMMddHHmmss
     * carNo: The plate number
     * dealType:
     */
    public getTaxiIllegalsByCarNo(searchStartTime: string, searchEndTime: string,
        carNo: string, dealType: number): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("carNo", carNo);
        searchs.set("dealType", dealType.toString());
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiIllegalsByCarNo", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }

    /**
     * Get a operation data 
     * timetype: 0:month, 1:year, 2:custom
     * startTime: 
     * endTime:
     * driverno: The driver's ID
     */
    public getOperationInfoAnlysis(timetype: number, startTime: string,
        endTime: string, departmentId: string): Observable<OperationAnlysisRespBean> {

        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("timetype", timetype.toString());
        searchs.set("startTime", startTime);
        searchs.set("endTime", endTime);
        searchs.set("departmentId", departmentId);
        searchs.set("accountCode", this.commonHttpService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getOperationInfoAnlysis", options)
            .map(res => {
                return this.commonHttpService.extractData(res);
            })
            .catch(error => {
                return this.commonHttpService.handleError(error);
            });
    }
}