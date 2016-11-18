import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LoginService } from './login-service';
import {
  BusDriverOperationRespBean, BusTasksRespBean, IllegalBean, ViolationBean,
  SaftyInfoBean, DispatchplanRespBean, SalaryBean, BusDriverDepartNoticeBean, BusDriverSafeNoticeBean,
  BusDriverNameAndNoBean
} from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class BusDriverService {
    static API_BASEURL: string = "http://221.131.92.133:8090/Bus_app_web/json/";
    static HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

    constructor(public http: Http, public loginService: LoginService) {
    }

    /**
     * Parse the received data.
     */
    private extractData(res: Response) {
        let body = res.json();
        return body.result;
    }

    /**
     * Handle the network errors
     */
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    /**
     * Get a driver's schedule by date
     * driverno: The driver's ID number
     * searchDate: yyyyMMdd
     */
    public searchBusTasksByDate(searchDate:string): Observable<BusTasksRespBean> {
        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });

        let searchs = new URLSearchParams();
        searchs.set("driverno", this.loginService.accountInfo.id);
        searchs.set("searchDate", searchDate);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "searchBusTasksByDate", options)
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
        endTime: string): Observable<BusDriverOperationRespBean> {

        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("timetype", timetype.toString());
        searchs.set("startTime", startTime);
        searchs.set("endTime", endTime);
        searchs.set("driverno", this.loginService.accountInfo.id);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getOperationInfoAnlysis", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the completed tasks
     * timetype: 0:month, 1:year, 2:custom
     * startTime:
     * endTime:
     * driverno: The driver's ID
     */
    public getCompleteBusInfoByCondition(timeType: number,
        startTime: string, endTime: string, driverno: string): Observable<DispatchplanRespBean[]> {

        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("timetype", timeType.toString());
        searchs.set("startTime", startTime);
        searchs.set("endTime", endTime);
        searchs.set("driverno", this.loginService.accountInfo.id);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getCompleteBusInfoByCondition", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the bus's illegal count
     * busNo: The bus's plate number
     */
    public getBusSaftyInfosByBusNo(busNo: string): Observable<SaftyInfoBean[]> {
        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busNo", busNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getBusSaftyInfosByBusNo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the latest two drive illegals
     * busNo: The bus's plate number
     */
    public getBusIllegalsByBusNoForTwo(busNo: string): Observable<IllegalBean[]> {
        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busNo", busNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getBusIllegalsByBusNoForTwo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getBusIllegalsByBusNo(busNo: string): Observable<IllegalBean[]> {
      let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
      let searchs = new URLSearchParams();
      searchs.set("busNo", busNo);
      searchs.set("accountCode", this.loginService.accountInfo.accountCode);

      let options = new RequestOptions({ headers: headers, search: searchs });

      return this.http.get(BusDriverService.API_BASEURL + "getBusIllegalsByBusNo", options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    /**
     * Get the latest two operation illegals
     * busNo: The bus's plate number
     */
    public getBusViolationsByBusNoForTwo(busNo: string): Observable<ViolationBean[]> {
        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("busNo", busNo);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getBusViolationsByBusNoForTwo", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

  /**
   * Get the latest two operation illegals
   * busNo: The bus's plate number
   */
  public getBusViolationsByBusNo(busNo: string): Observable<ViolationBean[]> {
    let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
    let searchs = new URLSearchParams();
    searchs.set("busNo", busNo);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({ headers: headers, search: searchs });

    return this.http.get(BusDriverService.API_BASEURL + "getBusViolationsByBusNoForTwo", options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    /**
     * Get the salary's detail infomation
     * accountid: The driver's account id
     * searchDate: yyyyMM
     */
    public getSalaryDetailByCondition(accountid: string, searchDate: string): Observable<SalaryBean[]> {
        let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountid", accountid);
        searchs.set("searchDate", searchDate);
        searchs.set("accountCode", this.loginService.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(BusDriverService.API_BASEURL + "getSalaryDetailByCondition", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

  /**
   * Get the bus driver's department tasks
   * @param accountid
   * @returns {Observable<R>}
   */
    public getBusDriverDepartmentTasks(accountid: string): Observable<BusDriverDepartNoticeBean[]> {

      let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
      let searchs = new URLSearchParams();
      searchs.set("accountid", accountid);
      searchs.set("accountCode", this.loginService.accountInfo.accountCode);

      let options = new RequestOptions({ headers: headers, search: searchs });

      return this.http.get(BusDriverService.API_BASEURL + "getBusDriverDepartmentTasks", options)
        .map(this.extractData)
        .catch(this.handleError);

    }

  public getBusDriverSafeMsg(accountid: string): Observable<BusDriverSafeNoticeBean[]> {

    let headers = new Headers({ 'Content-Type': BusDriverService.HEADER_CONTENT_TYPE });
    let searchs = new URLSearchParams();
    searchs.set("accountid", accountid);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({ headers: headers, search: searchs });

    return this.http.get(BusDriverService.API_BASEURL + "getBusDriverSafeMsg", options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  /**
   * Get bus driver's name and busno
   * @param driverno
   * @returns {Observable<R>}
   */
  public getBusDriverNameAndBusNo(): Observable<BusDriverNameAndNoBean> {

    let headers = new Headers({'Content-Type': BusDriverService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("driverno", this.loginService.accountInfo.id);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(BusDriverService.API_BASEURL + "getBusDriverNameAndBusNo", options)
      .map(this.extractData)
      .catch(this.handleError);

  }
}
