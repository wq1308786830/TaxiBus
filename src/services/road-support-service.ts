/**
 * Created by wangcai on 2016/11/21.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {LoginService} from './login-service';
import {Observable} from 'rxjs/Rx';

const API_BASEURL: string = "http://221.131.92.133:8090/RoadManage/json/";
const HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

@Injectable()
export class RoadSupportService {
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
   * getAllRoadLine
   * @param page: pageNo
   * @param rows: rows per page
   * @returns {Observable<R>}
   */
  public getAllRoadLine(page: number, rows: number) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllRoadLine", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getAllPatorlCateGory
   * @param page
   * @param rows
   * @returns {Observable<R>}
   */
  public getAllPatorlCateGory(page: number, rows: number) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllPatorlCateGory", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * GetAllPatorlItem
   * @param page
   * @param rows
   * @param categoryId
   * @returns {Observable<R>}
   */
  public getAllPatorlItem(page: number, rows: number, categoryId: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("categoryid", categoryId);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllPatorlItem", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * getAllEventAllot
   * @param page
   * @param rows
   * @param categoryId
   * @param itemId
   * @param start
   * @param end
   * @param lineId
   * @param status
   * @returns {Observable<R>}
   */
  public getAllEventAllot(page: number, rows: number, categoryId: string,
                          itemId: string, start: string, end: string, lineId: string, status: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("categoryid", categoryId);
    searchs.set("itemid", itemId);
    searchs.set("start", start);
    searchs.set("end", end);
    searchs.set("lineid", lineId);
    searchs.set("status", status);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllEventAllot", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * GetAllPerson
   * @param page
   * @param rows
   * @param name
   * @param positionId
   * @returns {Observable<R>}
   */
  public getAllPerson(page: number, rows: number, name: string, positionId: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("name", name);
    searchs.set("positionid", positionId);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllPerson", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * get one person info
   * @param page
   * @param rows
   * @param name
   * @param personId
   * @returns {Observable<R>}
   */
  public getPersonInfo(page: number, rows: number, name: string, personId: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("personid", personId);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetPersonInfo", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * GetAllCar
   * @param page
   * @param rows
   * @param name
   * @param carCode
   * @returns {Observable<R>}
   */
  public getAllCar(page: number, rows: number, carCode?: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("CarCode", carCode);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetAllCar", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * get one Car
   * @param page
   * @param rows
   * @param name
   * @param carId
   * @returns {Observable<R>}
   */
  public getCar(page: number, rows: number, name: string, carId: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("carid", carId);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetCar", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * GetTrajectory
   * @param page
   * @param rows
   * @param name
   * @param carCode
   * @param date
   * @returns {Observable<R>}
   */
  public getTrajectory(page: number, rows: number, carCode: string, date: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("page", page.toString());
    searchs.set("rows", rows.toString());
    searchs.set("carcode", carCode);
    searchs.set("date", date);
    searchs.set("accountCode", this.loginService.accountInfo.accountCode);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(API_BASEURL + "GetCar", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * post event report msg to save
   * @param sendPersonID
   * @param receiverID
   * @param roadLineID
   * @param patorlItemID
   * @param latitudeLongitude
   * @param mark
   * @param picture
   * @param eventContent
   * @param lane
   * @param opinion
   * @returns {Observable<R>}
   */
  public postEventReport(sendPersonID: string, receiverID: string, roadLineID: string,
                         patorlItemID: string, latitudeLongitude: string, mark: string,
                         picture: string, eventContent: string, lane: string, opinion: string) {
    let headers = new Headers({'Content-Type': HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("SendPersonID", sendPersonID);
    searchs.set("ReceiverID", receiverID);
    searchs.set("RoadLineID", roadLineID);
    searchs.set("PatorlItemID", patorlItemID);
    searchs.set("LatitudeLongitude", latitudeLongitude);
    searchs.set("Mark", mark);
    searchs.set("Picture", picture);
    searchs.set("EventContent", eventContent);
    searchs.set("Lane", lane);
    searchs.set("Opinion", opinion);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.post(API_BASEURL + "AddEventAllot", options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
