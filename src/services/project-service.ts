import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Platform} from "ionic-angular";
import {CommonHttpService} from "./common-http-service";
import {
  ProjectAccountBean, ProjectSignTimesRepBean, ProjectItemBean, SignInfoBean,
  ProjectFileInfo, ProjectFileContent, ProjectDetailBean
} from "../beans/beans";
import {HNBridge} from "../components/ng2-hnbridge";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ProjectService {
  static API_BASEURL: string = CommonHttpService.API_HOST + "project_manage_app/";
  static HEADER_CONTENT_TYPE: string = "text/html;charset=utf-8";

  public getLocatioonTimer: number;

  constructor(public http: Http,
              public platform: Platform,
              public commonHttpService: CommonHttpService) {
    this.getLocatioonTimer = -1;
  }

  public login(): Observable<ProjectAccountBean> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("account", this.commonHttpService.accountInfo.account);
    searchs.set("password", this.commonHttpService.accountInfo.password);
    searchs.set("action", "login");

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "login", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  public addGpsInfo(latitude: number, longitude: number): Observable<string> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("latitude", latitude.toString());
    searchs.set("longitude", longitude.toString());

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/addGpsInfo", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  public startGetLocation() {
    this.clearGetLocationTimer();

    this.getLocatioonTimer = setInterval(() => {
      this.getUserLocation();
    }, 10000);
  }

  public stopGetLocation() {
    this.clearGetLocationTimer();
  }

  public getUserLocation() {
    this.platform.ready().then(() => {
      HNBridge.getLocation(location => {
        this.addGpsInfo(location.lat, location.lng).subscribe(msg => {

        });
      }, error => {

      });
    });
  }

  private clearGetLocationTimer() {
    if (this.getLocatioonTimer !== -1) {
      clearInterval(this.getLocatioonTimer);
      this.getLocatioonTimer = -1;
    }
  }

  /**
   * getSignTimes
   * @param dateVale
   * @returns {Observable<R>}
   */
  public getSignTimes(dateVale?: string): Observable<ProjectSignTimesRepBean> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    if (dateVale) {
      searchs.set("date", dateVale);
    }

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/getSignTimes", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * /mobile/getProjectList
   * @param dateVale
   * @returns {Observable<R>}
   */
  public getProjectList(dateVale: string): Observable<ProjectItemBean[]> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("date", dateVale);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/getProjectList", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * postSignin
   * @param projectCode
   * @param signinTime
   * @param signinAddr
   * @param signinLonLat
   * @param comments
   * @returns {Observable<R>}
   */
  public signin(projectCode: string, signinTime: string,
                signinAddr: string, signinLonLat: string,
                comments: string): Observable<any> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("projectCode", projectCode);
    searchs.set("signinTime", signinTime);
    searchs.set("signinAddr", signinAddr);
    searchs.set("signinLonLat", signinLonLat);
    searchs.set("comments", comments);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/signin", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * signout
   * @param projectCode
   * @param signinTime
   * @param signinAddr
   * @param signinLonLat
   * @param comments
   * @returns {Observable<R>}
   */
  public signout(projectCode: string, signinTime: string,
                 signoutAddr: string, signoutLonLat: string,
                 comments: string): Observable<any> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("projectCode", projectCode);
    searchs.set("signinTime", signinTime);
    searchs.set("signoutAddr", signoutAddr);
    searchs.set("signoutLonLat", signoutLonLat);
    searchs.set("comments", comments);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/signout", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * signManage
   * @param date
   * @returns {Observable<R>}
   */
  public signManage(date: string): Observable<SignInfoBean[]> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("date", date);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/signManage", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * fileManage
   * @param date
   * @returns {Observable<R>}
   */
  public fileManage(date: string): Observable<ProjectFileInfo[]> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("date", date);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/projectFileManage", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  /**
   * getFile Content
   * @param date
   * @param proFileInfo
   * @returns {Observable<R>}
   */
  public getFileContent(date: string, proFileInfo: ProjectFileInfo): Observable<ProjectFileContent> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("date", date);
    searchs.set("projectCode", proFileInfo.projectCode);
    searchs.set("fileName", proFileInfo.files[0].fileName);
    searchs.set("filePath", proFileInfo.files[0].filePath);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/getFile", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }

  public getProjectInfo(info: string): Observable<ProjectDetailBean[]> {
    let headers = new Headers({'Content-Type': ProjectService.HEADER_CONTENT_TYPE});
    let searchs = new URLSearchParams();
    searchs.set("accountId", this.commonHttpService.accountInfo.account);
    searchs.set("info", info);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(ProjectService.API_BASEURL + "mobile/getProjectInfo", options)
      .map(res => {
        return this.commonHttpService.extractData(res);
      })
      .catch(error => {
        return this.commonHttpService.handleError(error);
      });
  }
}
