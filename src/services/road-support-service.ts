
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CommonHttpService } from './common-http-service';
import { RoadMgrEventBean, RoadMgrLawBean, PatorlBean } from '../beans/beans';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RoadSupportService {
  static API_BASEURL: string = CommonHttpService.API_HOST + "RoadManage/json/";
  static HEADER_CONTENT_TYPE: string = "text/html;charset=utf-8";

  constructor(public http: Http, public commonHttpService: CommonHttpService) {
  }

  public getAllEventAllot(page: number, rows: number, categoryId: string,
    itemId: string, start: string, end: string,
    lineId: string, status: number): Observable<RoadMgrEventBean[]> {
    let headers = new Headers({ 'Content-Type': RoadSupportService.HEADER_CONTENT_TYPE });
    let searchs = new URLSearchParams();
    searchs.set("categoryId", categoryId);
    searchs.set("pageIndex", page.toString());
    searchs.set("pageRecords", rows.toString());
    searchs.set("itemId", itemId);
    searchs.set("start", start);
    searchs.set("end", end);
    searchs.set("lineid", lineId);
    searchs.set("status", status.toString());

    let options = new RequestOptions({ headers: headers, search: searchs });

    return this.http.get(RoadSupportService.API_BASEURL + "getAllEventAllot", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  public getAllLawDetails(pageIndex: number, pageRecords: number): Observable<RoadMgrLawBean[]> {
    let headers = new Headers({ 'Content-Type': RoadSupportService.HEADER_CONTENT_TYPE });
    let searchs = new URLSearchParams();
    searchs.set("pageIndex", pageIndex.toString());
    searchs.set("pageRecords", pageRecords.toString());

    let options = new RequestOptions({ headers: headers, search: searchs });

    return this.http.get(RoadSupportService.API_BASEURL + "getAllLawDetails", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  public getAllPatorlRecord(pageIndex: number, pageRecords: number,
    start: string, end: string, personId: string,
    roadlineId: string, type: string): Observable<PatorlBean[]> {
    let headers = new Headers({ 'Content-Type': RoadSupportService.HEADER_CONTENT_TYPE });
    let searchs = new URLSearchParams();
    searchs.set("pageIndex", pageIndex.toString());
    searchs.set("pageRecords", pageRecords.toString());
    searchs.set("start", start);
    searchs.set("end", end);
    searchs.set("personId", personId);
    searchs.set("roadlineId", roadlineId);
    searchs.set("type", type);

    let options = new RequestOptions({ headers: headers, search: searchs });

    return this.http.get(RoadSupportService.API_BASEURL + "getAllPatorlRecord", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }
}
