import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { LoginPage } from '../pages/main/login/login';
import { LoginService } from './login-service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {
    TaxiInfo, RealTimeTaxiGpsBean, FaultCountBean, TaxiDriversBean, TaxiSearchInfo,
    IllegalBean, ViolationBean, DepartmentBean, OperationAnlysisRespBean
} from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TaxiAdminService {
    static API_BASEURL: string = "http://221.131.92.133:8090/Taxi_app_web/json/";
    static HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

    constructor(public http: Http, public app: App, public loginService: LoginService) {
    }

    private extractData(res: Response) {
        let body = res.json();
        if (body.retCode === 0 && body.result) {
            return body.result;
        }

        if (body.retCode === -20) {
            throw new Error("NeedLogin");
        } else {
            throw new Error(body.message || "error");
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if (errMsg === "NeedLogin") {
            this.app.getRootNav().setRoot(LoginPage);
            return null;
        } else {
            return Observable.throw(errMsg);
        }
    }

    /**
     * Get the realtime gps data
     */
    public getAllCarRealtimeGPS(): Observable<RealTimeTaxiGpsBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getAllCarRealtimeGPS", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get all the department
     */
    public getAllDepartmentBaseInfo(): Observable<DepartmentBean[]> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getAllDepartmentBaseInfo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the taxi's basic infomation
     * carNo: plate number
     */
    public getTaxiBaseInfoByCarNo(carNo: string): Observable<TaxiInfo> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiBaseInfoByCarNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the taxi's basic infomation and illegal count
     * carNo: plate number
     */
    public getTaxiBaseInfoAndFaultCountByCarNo(carNo: string): Observable<TaxiDriversBean> {
        let headers = new Headers({ 'Content-Type': TaxiAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiBaseInfoAndFaultCountByCarNo", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoAndFaultCountByDepartmentId", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoListByDepartmentId", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getCarNoListByCarno", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiViolationsByCarNo", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getTaxiIllegalsByCarNo", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(TaxiAdminService.API_BASEURL + "getOperationInfoAnlysis", options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}