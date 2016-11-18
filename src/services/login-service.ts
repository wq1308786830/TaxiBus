import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/main/login/login';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { AccountBean, ProjectAccountBean, CameraBean, CameraVideoUrl } from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoginService {
    static API_BASEURL: string = "http://221.131.92.133:8090/Taxi_app_web/json/";
    static HEADER_CONTENT_TYPE: string = "application/x-www-form-urlencoded";

    static PRPJECT_API_BASEURL: string = "http://221.131.92.133:8090/project_manage_app/";
    static PRPJECT_HEADER_CONTENT_TYPE: string = "text/html;charset=utf-8";

    static ROAD_API_BASEURL: string = "http://221.131.92.133:8090/RoadManage/json/";
    static ROAD_HEADER_CONTENT_TYPE: string = "text/html;charset=utf-8;";


    public accountInfo: AccountBean;

    constructor(public http: Http, public app: App, public platform:Platform) {
        this.accountInfo = new AccountBean();
    }

    private extractData(res: Response) {
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

    private handleError(error: any) {
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
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("account", account);
        searchs.set("password", password);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.API_BASEURL + "login", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * logout
     */
    public logout() {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.API_BASEURL + "logout", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * update password
     */
    public updatePassword(password: string, newPassword: string): Observable<AccountBean> {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("account", this.accountInfo.account);
        searchs.set("password", password);
        searchs.set("newPassword", newPassword);
        searchs.set("stype", this.accountInfo.stype);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.API_BASEURL + "updatePassword", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addMsgPushInfo4Traffic(channelId: string): Observable<AccountBean> {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("accountId", this.accountInfo.account);
        searchs.set("channelId", channelId);
        searchs.set("type", this.platform.is('ios')? "4" : "3");

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.API_BASEURL + "addMsgPushInfo4Traffic", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Project manage
    //////////////////////////////////////////////////////////////////////////////////////////////
    public project_login(): Observable<ProjectAccountBean> {
        let headers = new Headers({ 'Content-Type': LoginService.PRPJECT_HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("account", this.accountInfo.account);
        searchs.set("password", this.accountInfo.password);
        searchs.set("action", "login");

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.PRPJECT_API_BASEURL + "login", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Road manage
    //////////////////////////////////////////////////////////////////////////////////////////////
    public login_road(): Observable<ProjectAccountBean> {
        let headers = new Headers({ 'Content-Type': LoginService.ROAD_HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("account", this.accountInfo.account);
        searchs.set("password", this.accountInfo.password);
        searchs.set("action", "login");

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get(LoginService.ROAD_API_BASEURL + "login", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the car's camera list
     * carNo:
     */
    public getVehicleCameraList(carNo: string, type: string): Observable<CameraBean[]> {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("carNo", carNo);
        searchs.set("videoType", type);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get("http://221.131.92.133:8090/Bus_app_web/json/getVehicleCameraList", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get the video's play url
     * guid:
     */
    public getVideoPlayUrl(guId: string, type: string): Observable<CameraVideoUrl> {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("guId", guId);
        searchs.set("videoType", type);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get("http://221.131.92.133:8090/Bus_app_web/json/getVideoPlayUrl", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Keep the beat heart
     * carNo:
     */
    sendVideoBeatHeart(guId: string) {
        let headers = new Headers({ 'Content-Type': LoginService.HEADER_CONTENT_TYPE });
        let searchs = new URLSearchParams();
        searchs.set("guId", guId);
        searchs.set("accountCode", this.accountInfo.accountCode);

        let options = new RequestOptions({ headers: headers, search: searchs });

        return this.http.get("http://221.131.92.133:8090/Bus_app_web/json/videoPlayHeartbeat", options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
