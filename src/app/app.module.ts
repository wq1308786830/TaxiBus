import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

/**
 * Common services
 */
import { LoginService } from '../services/login-service';
import { TaxiAdminService } from '../services/taxi-admin-service';
import { TaxiDriverService } from '../services/taxi-driver-service';
import { BusDriverService } from '../services/bus-driver-service';
import { BusAdminService } from '../services/bus-admin-service';
import { CommonService } from '../services/common-service';


/**
 * Common components
 */
import { Ng2Echart } from '../components/ng2-echart';
import { DropdownCom } from '../components/dropdown/dropdown-component';
import { DropdownController } from '../components/dropdown/dropdown';
import { Ng2DatePicker } from '../components/ng2-datepicker/ng2-datepicker';
import { Ng2DateSelect } from '../components/ng2-dateselect/ng2-dateselect';
import { HNBridge } from '../components/ng2-hnbridge';

import { LoginPage } from '../pages/main/login/login';
import { HomePage } from '../pages/main/home/home';
import { PasswordPage } from '../pages/main/password/password';

/**
 * Taxi administor
 */
import { TaxiAdminAnalyze } from '../pages/taxiAdmin/analyze/analyze';
import { TaxiAdminDetail } from '../pages/taxiAdmin/detail/detail';
import { TaxiAdminMainTab } from '../pages/taxiAdmin/maintab/maintab';
import { TaxiAdminMonitor } from '../pages/taxiAdmin/monitor/monitor';
import { TaxiAdminSearch } from '../pages/taxiAdmin/search/search';
import { TaxiAdminSearchResult } from '../pages/taxiAdmin/searchresult/searchresult';
import { TaxiAdminTaxiCard } from '../pages/taxiAdmin/taxicard/taxicard';
import { TaxiAdminTaxilist } from '../pages/taxiAdmin/taxilist/taxilist';
import { TaxiAdminIllegal } from '../pages/taxiAdmin/illegal/illegal';
import { TaxiAdminViolation } from '../pages/taxiAdmin/violation/violation';
import { TaxiAdminSearchMap } from '../pages/taxiAdmin/searchmap/searchmap';
import { TaxiAdminVideo } from '../pages/taxiAdmin/video/video';

/**
 * Taxi driver
 */
import { TaxiDriverAlertSetting } from '../pages/taxiDriver/alertSetting/alertSetting';
import { TaxiDriverAnalyze } from '../pages/taxiDriver/analyze/analyze';
import { TaxiDriverMainTab } from '../pages/taxiDriver/maintab/maintab';
import { TaxiDriverMy } from '../pages/taxiDriver/my/my';
import { TaxiDriverMyOrderList } from '../pages/taxiDriver/myOrderList/myOrderList';
import { TaxiDriverSafetyCenter } from '../pages/taxiDriver/safetyCenter/safetyCenter';
import { TaxiDriverIllegal } from '../pages/taxiDriver/illegal/illegal';
import { TaxiDriverViolation } from '../pages/taxiDriver/violation/violation';

/**
 * Bus administor
 */
import { BusAdminAnalyze } from '../pages/busAdmin/analyze/analyze';
import { BusAdminBusDetail } from '../pages/busAdmin/detail/detail';
import { BusAdminMainTab } from '../pages/busAdmin/maintab/maintab';
import { BusAdminMonitor } from '../pages/busAdmin/monitor/monitor';
import { BusAdminSearch } from '../pages/busAdmin/search/search';
import { BusAdminSearchResult } from '../pages/busAdmin/searchres/searchres';
import { BusAdminBusCard } from '../pages/busAdmin/buscard/buscard';
import { BusAdminBusList } from '../pages/busAdmin/buslist/buslist';
import { BusAdminBusInfo } from '../pages/busAdmin/businfo/businfo';
import { BusAdminIllegal } from '../pages/busAdmin/illegal/illegal';
import { BusAdminViolation } from '../pages/busAdmin/violation/violation';
import { BusAdminInsurance } from '../pages/busAdmin/busInsure/busInsurance';
import { BusAdminSearchMap } from '../pages/busAdmin/searchmap/searchmap';
import { BusAdminVideo } from '../pages/busAdmin/video/video';

/**
 * Bus driver
 */
import { BusDriverMainTab } from '../pages/busDriver/maintab/maintab';
import { BusDriverSchedule } from '../pages/busDriver/schedule/schedule';
import { BusDriverOperator } from '../pages/busDriver/operator/operator';
import { BusDriverSecurity } from '../pages/busDriver/security/security';
import { BusDriverMy } from '../pages/busDriver/my/my';
import { BusDriverCompleteTasks } from '../pages/busDriver/completeTask/completeTask';
import { BusDriverAlertSetting } from '../pages/busDriver/alertSetting/alertSetting';
import { BusDriverMysalary } from '../pages/busDriver/mySalary/mySalary';
import { BusDriverNotices } from '../pages/busDriver/notices/notices';
import {BusDriverIllegal} from "../pages/busDriver/illegal/illegal";
import {BusDriverViolation} from "../pages/busDriver/violation/violation";


/**
 * RealMonitor
 */
import { RealMonitorMainpage } from '../pages/realMonitor/mainPage/mainPage';


@NgModule({
  declarations: [
    MyApp,
    Ng2Echart,
    DropdownCom,
    Ng2DatePicker,
    Ng2DateSelect,

    LoginPage,
    HomePage,
    PasswordPage,

    TaxiAdminAnalyze,
    TaxiAdminDetail,
    TaxiAdminMainTab,
    TaxiAdminMonitor,
    TaxiAdminSearch,
    TaxiAdminSearchResult,
    TaxiAdminTaxiCard,
    TaxiAdminTaxilist,
    TaxiAdminIllegal,
    TaxiAdminViolation,
    TaxiAdminSearchMap,
    TaxiAdminVideo,

    TaxiDriverAlertSetting,
    TaxiDriverAnalyze,
    TaxiDriverMainTab,
    TaxiDriverMy,
    TaxiDriverMyOrderList,
    TaxiDriverSafetyCenter,
    TaxiDriverIllegal,
    TaxiDriverViolation,

    BusAdminAnalyze,
    BusAdminBusDetail,
    BusAdminMainTab,
    BusAdminMonitor,
    BusAdminSearch,
    BusAdminSearchResult,
    BusAdminBusCard,
    BusAdminBusList,
    BusAdminIllegal,
    BusAdminViolation,
    BusAdminInsurance,
    BusAdminBusInfo,
    BusAdminSearchMap,
    BusAdminVideo,

    BusDriverMainTab,
    BusDriverSchedule,
    BusDriverOperator,
    BusDriverSecurity,
    BusDriverIllegal,
    BusDriverViolation,
    BusDriverMy,
    BusDriverCompleteTasks,
    BusDriverAlertSetting,
    BusDriverMysalary,
    BusDriverNotices,
    RealMonitorMainpage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: "ios",
      backButtonText: "返回",
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Ng2Echart,
    DropdownCom,
    Ng2DatePicker,
    Ng2DateSelect,

    LoginPage,
    HomePage,
    PasswordPage,

    TaxiAdminAnalyze,
    TaxiAdminDetail,
    TaxiAdminMainTab,
    TaxiAdminMonitor,
    TaxiAdminSearch,
    TaxiAdminSearchResult,
    TaxiAdminTaxiCard,
    TaxiAdminTaxilist,
    TaxiAdminIllegal,
    TaxiAdminViolation,
    TaxiAdminSearchMap,
    TaxiAdminVideo,

    TaxiDriverAlertSetting,
    TaxiDriverAnalyze,
    TaxiDriverMainTab,
    TaxiDriverMy,
    TaxiDriverMyOrderList,
    TaxiDriverSafetyCenter,
    TaxiDriverIllegal,
    TaxiDriverViolation,

    BusAdminAnalyze,
    BusAdminBusDetail,
    BusAdminMainTab,
    BusAdminMonitor,
    BusAdminSearch,
    BusAdminSearchResult,
    BusAdminBusCard,
    BusAdminBusList,
    BusAdminIllegal,
    BusAdminViolation,
    BusAdminInsurance,
    BusAdminBusInfo,
    BusAdminSearchMap,
    BusAdminVideo,

    BusDriverMainTab,
    BusDriverSchedule,
    BusDriverOperator,
    BusDriverSecurity,
    BusDriverIllegal,
    BusDriverViolation,
    BusDriverMy,
    BusDriverCompleteTasks,
    BusDriverAlertSetting,
    BusDriverMysalary,
    BusDriverNotices,
    RealMonitorMainpage
  ],
  providers: [HNBridge, CommonService, LoginService, BusAdminService, TaxiDriverService, TaxiAdminService, BusDriverService, DropdownController]
})
export class AppModule {}
