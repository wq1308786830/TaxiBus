import { Injectable } from '@angular/core';
import { LoginService } from './login-service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {
    BusGpsBean, BusSimpleInfoBean, BusDetailInfoBean, BusViolationBean, BusOperationAnlysisBean,
    IllegalBean, ViolationBean, DepartmentBean, BusSearchInfo, BusInsuranceBean
} from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class BusAdminService {
    static API_BASEURL: string = "http://221.131.92.133:8090/Bus_app_web/json/";
    static HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

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
     * Get the realtime buses' gps data
     */
    public getRealTimeBus(): Observable<BusGpsBean[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getAllCarRealtimeGPS", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus' information
     * busno: The bus' plate number
     */
    public getCurrentDirverAndBusInfoByBusNo(busno: string): Observable<BusSimpleInfoBean> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busno", busno);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getCurrentDirverAndBusInfoByBusNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus's detail information
     * busno: The bus' plate number
     */
    public getCurrentBusDetailInfo(onboardid: string): Observable<BusDetailInfoBean> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("onboardid", onboardid);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getCurrentBusDetailInfo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus list
     * busno: The bus' plate number
     */
    public getBusAndViolationsByDepartId(departmentId: string, pageIndex: number, pageCount: number): Observable<BusViolationBean[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("departmentId", departmentId);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusAndViolationsByDepartId", options)
            // .timeout(10000, new Error('请求超时'))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus' violation list
     * searchStartTime: yyyyMMddHHmmss
     * searchEndTime: yyyyMMddHHmmss
     * busno: The plate number
     * dealType:
     */
    public getBusViolationsByBusNo(searchStartTime: string, searchEndTime: string,
        busno: string, dealType: number): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("busno", busno);
        searchs.set("dealType", dealType.toString());
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusViolationsByBusNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus' drive illegals list
     * searchStartTime: yyyyMMddHHmmss
     * searchEndTime: yyyyMMddHHmmss
     * busno: The plate number
     * dealType:
     */
    public getBusIllegalsByBusNo(searchStartTime: string, searchEndTime: string,
        busno: string, dealType: number): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("searchStartTime", searchStartTime);
        searchs.set("searchEndTime", searchEndTime);
        searchs.set("busno", busno);
        searchs.set("dealType", dealType.toString());
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusIllegalsByBusNo", options)
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
        endTime: string, departmentId: string): Observable<BusOperationAnlysisBean> {

        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("timetype", timetype.toString());
        searchs.set("startTime", startTime);
        searchs.set("endTime", endTime);
        searchs.set("departmentId", departmentId);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getOperationInfoAnlysisByNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus list by dempartment id
     * departmentid:
     */
    public getBusesByDepartId(departmentid: string, pageIndex: number, pageCount: number): Observable<BusSearchInfo[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("departmentid", departmentid);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusesByDepartId", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus list by the bus number
     * departmentid:
     */
    public getBusByBusNo(busno: string, pageIndex: number, pageCount: number): Observable<BusSearchInfo[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busno", busno);
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusByBusNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the department list
     * departmentid:
     */
    public getAllDepartments(): Observable<DepartmentBean[]> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getAllDepartments", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the Bus Insurance info
     * busno: 公交车号
     */
    public getBusInsuranceInfo(busno: string): Observable<BusInsuranceBean> {
        let headers = new Headers({ 'Content-Type': BusAdminService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busNo", busno);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusAdminService.API_BASEURL + "getBusInsuranceInfo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
