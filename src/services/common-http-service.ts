import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/main/login/login';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { AccountBean, CameraBean, CameraVideoUrl, StationCameraBean } from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CommonHttpService {
    static API_HOST: string = "http://192.168.1.102:3001/";//"http://221.131.92.133:8090/"; "http://192.168.1.102:3001/"
    static CONTENT_TYPE_APPLICATION: string = "application/x-www-form-urlencoded";

    public accountInfo: AccountBean;

    constructor(public http: Http, public app: App, public platform:Platform) {
        this.accountInfo = new AccountBean();
    }

    public extractData(res: Response) {
        let body = res.json();
        if (body.retCode === 0) {
            return body.result;
        }

        if (body.retCode === -20) {
            throw new Error("ErrorNeedLogin");
        } else if (body.retCode === -40 || body.retCode === -50) {
            throw new Error("ErrorPassword");
        } else if (body.retCode === -60) {
            throw new Error("ModifyPasswordError");
        } else {
            throw new Error(body.message || "error");
        }
    }

    public handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        if (errMsg === "ErrorNeedLogin") {
            this.app.getActiveNav().push(LoginPage);
            return null;
        } else {
            return Observable.throw(errMsg);
        }
    }

    /**
     * login
     */
    public login(account: string, password: string): Observable<AccountBean> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("account", account);
        searchs.set("password", password);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Taxi_app_web/json/login", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * logout
     */
    public logout() {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Taxi_app_web/json/logout", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * update password
     */
    public updatePassword(password: string, newPassword: string): Observable<AccountBean> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("account", this.accountInfo.account);
        searchs.set("password", password);
        searchs.set("newPassword", newPassword);
        searchs.set("stype", this.accountInfo.stype);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Taxi_app_web/json/updatePassword", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    public addMsgPushInfo4Traffic(channelId: string): Observable<AccountBean> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("accountId", this.accountInfo.account);
        searchs.set("channelId", channelId);
        searchs.set("type", this.platform.is('ios')? "4" : "3");

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Taxi_app_web/json/addMsgPushInfo4Traffic", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }


    /**
     * Get the car's camera list
     * carNo:
     */
    public getVehicleCameraList(carNo: string, type: string): Observable<CameraBean[]> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("videoType", type);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Bus_app_web/json/getVehicleCameraList", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * Get the video's play url
     * guid:
     */
    public getVideoPlayUrl(guId: string, type: string): Observable<CameraVideoUrl> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("guId", guId);
        searchs.set("videoType", type);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Bus_app_web/json/getVideoPlayUrl", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * Keep the beat heart
     */
    sendVideoBeatHeart(guId: string) {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("guId", guId);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Bus_app_web/json/videoPlayHeartbeat", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * Keep the fixed camera list of the police
     */
    getPoliceCameraList(pageIndex: number, pageCount: number): Observable<StationCameraBean[]> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Bus_app_web/json/getPoliceList", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }

    /**
     * Keep the fixed camera list of the bus stations
     */
    getStationCameraList(pageIndex: number, pageCount: number): Observable<StationCameraBean[]> {
        let headers = new Headers({ 'Content-Type': CommonHttpService.CONTENT_TYPE_APPLICATION });
        let searchs = new URLSearchParams();
        searchs.set("pageIndex", pageIndex.toString());
        searchs.set("pageCount", pageCount.toString());
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(CommonHttpService.API_HOST + "Bus_app_web/json/getStationList", options)
            .map(res=>{
                return this.extractData(res);
            })
            .catch(error=>{
                return this.handleError(error);
            });
    }
}
