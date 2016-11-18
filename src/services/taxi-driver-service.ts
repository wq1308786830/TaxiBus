import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LoginService } from './login-service';
import { OperationAnlysisRespBean, IllegalBean, ViolationBean, SaftyInfoBean, DriverInfoBean,OperationRecordBean } from '../beans/beans';
import { Observable } from 'rxjs/Rx';

const API_BASEURL: string = "http://221.131.92.133:8090/Taxi_app_web/json/";
const HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

@Injectable()
export class TaxiDriverService {
    constructor(public http: Http, public loginService: LoginService) {
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.result;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getOperationInfoAnlysisByDriverNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the taxi driver's name and number
     * driverNo:
     */
    public getCarNoAndDriverName(): Observable<DriverInfoBean> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", this.loginService.accountInfo.id);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getCarNoAndDriverName", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the record list
     * driverNo:
     */
    public getOperateRecords(driverNo: string): Observable<OperationRecordBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getOperateRecords", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the safity infomation
     * driverNo:
     */
    public getTaxiSaftyInfosByDriverNo(driverNo: string): Observable<SaftyInfoBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiSaftyInfosByDriverNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the latest tow illegal infomation
     * driverNo:
     */
    public getTaxiIllegalsByDriverNoForTwo(driverNo: string): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiIllegalsByDriverNoForTwo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**
     * Get the latest tow violation infomation
     * driverNo:
     */
    public getTaxiViolationsByDriverNoForTwo(driverNo: string): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("driverNo", driverNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiViolationsByDriverNoForTwo", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiIllegalsByDriverNo", options)
            .map(this.extractData)
            .catch(this.handleError);
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
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(API_BASEURL + "getTaxiViolationsByDriverNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
