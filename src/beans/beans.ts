import { GoogleMapsMarker } from 'ionic-native';

export class AccountBean {
    account: string;                //账号
    password: string;               //密码
    name: string;                   //姓名
    type: string;                   //权限
    accountCode: string             //
    id: string;                     //司机工号
    stype: string;
}

export class RealTimeTaxiGpsBean {
    carNo: string;                  //车牌号码
    latitude: number;               //纬度
    longitude: number;              //经度
    gpsDate: string;                //GPS时间，yyyyMMddhhmmss
    speed: number;                  //速度
    direction: string;              //方向 0~360度, 0度正北
    status: string;                 //状态 0:空载; 1:满载; 3:保留
}

export class TaxiMarker {
    gpsinfo: RealTimeTaxiGpsBean;
    marker: GoogleMapsMarker;
    hasAddMarker: boolean;
}

export class BaseTaxiInfo {
    carNo: string;                  //车牌号码
    departName: string;             //公司名称
}

export class TaxiSearchInfo {
    carNo: string;                  //车牌号码
    departName: string;             //公司名称
    direction: string;              //方向
    gpsDate: string;                //GPS时间
    latitude: number;               //纬度
    longitude: number;              //经度
    speed: number;                  //速度
    status: string;                 //状态
}

export class TaxiInfo {
    carNo: string;                  //车牌号码
    departName: string;             //所属公司
    phone: string;                  //联系电话
    keepDate: string;               //应保养日期
    address: string;                //公司地址
    hostBrand: string;              //品牌
    carColor: string;               //颜色
    state: string;                  //（保养）状态
}

export class TaxiDriversBean {
    carNo: string;                  //车牌号码
    departName: string;             //所属公司
    firstDriverName: string;        //司机姓名1
    firstDriverNo: string;          //驾驶证号码1
    firstDriverPhone: string;       //联系电话1
    secondDriverName: string;       //司机姓名2
    secondDriverNo: string;         //驾驶证号码2
    secondDriverPhone: string;      //联系电话2
    totoalRecords: number;          //违章数
}


export class VehicleBean {
    driverName: string;             //司机姓名
    departName: string;             //所属公司
    driverNo: string;               //工号
    driverPhone: string;            //联系电话
    illegalCount: number;           //交通违章数
    violationCount: number;         //运营违规数
}

export class FaultCountBean {
    carNO: string;                  //车牌号吗
    departName: string;             //公司名称
    complaintSuggestCount: number;  //运营违规数＋交通违章数
}

export class IllegalBean {
    illegalTime: string;            //违章时间
    illegalPlace: string;           //违章地点
    illegalRegulation: string;      //违章条例
    detainScore: string;            //扣分情况
    fineSituation: string;          //罚款情况
    dealType: number;               //处理状态
}

export class ViolationBean {
    violationTime: string;          //运营违规时间
    violationPlace: string;         //运营违规地点
    violationRegulation: string;    //运营违规条例
    punishment: string;             //处罚内容
    dealType: number;               //处理状态
}

/////////////////////////////////////////////////////////
export class SaftyInfoBean {
    illegalCount: number;           //违章次数
    violationCount: number;         //违规次数
    detainScore: number;            //扣分分数
}

export class DriverInfoBean {
    driverName: string;             //司机姓名
    carNo: string;                  //车牌号码
}

export class OperationRecordBean {
    recordId: string;               //运营记录ID
    driveOnTime: string;            //营运记录时间(上车时间)
    driveOffTime: string;           //下车时间
    startLat: string;               //起始地点纬度
    startlon: string;               //起始地点经度
    endLat: string;                 //结束地点纬度
    endLon: string;                 //结束地点经度
    state: number;                  //订单状态
}


export class TaxiOperationBar {
    resultStr: string;              //时间文字
    orderCount: number;             //完成班次
}

export class OperationAnlysisRespBean {
    barInfo: TaxiOperationBar[];    //图表信息
    totalOpeCount: number;          //订单总条数
    totalFee: number;               //收入总数
    totalRun: number;               //载客总里程
    totalEmptyDrive: number;        //空驶总里程
    mileageRate: number;            //载客率
    feeTaxiHundredKm: number;       //百公里营收
    mileageTaxiOne: number;         //每单均里程
    feeTaxiOne: number;             //每单均营收
}


/////////////////////////////////////////////////////////
export class BusGpsBean {
    carNo: string;                  //车牌号码
    latitude: number;               //纬度
    longitude: number;              //经度
    gpsDate: string;                //GPS时间，yyyyMMddhhmmss
    speed: number;                  //速度
    direction: string;              //方向 0~360度, 0度正北
    status: string;                 //状态 0:空载; 1:满载; 3:保留
}

export class BusMarker {
    gpsinfo: BusGpsBean;
    marker: GoogleMapsMarker;
    hasMarker: boolean;
}

export class BusBaseInfoBean {
    busno: string;                  //车牌号码
    departname: string;             //部门名称
    linename: string;               //线路名称
}

export class BusSearchInfo {
    busno: string;                  //车牌号码
    departname: string;             //公司名称
    gpsDate: string;                //GPS时间
    latitude: number;               //纬度
    longitude: number;              //经度
    linename: string;               //线路名称
    speed: number;                  //速度
    status: string;                 //状态
    orientation: string;            //方向
    totoalRecords: number;          //违章
}

export class BusSimpleInfoBean {
    drivername: string;             //司机姓名
    driverno: string;               //司机工号
    busno: string;                  //车牌号码
    linename: string;               //所属线路
    departname: string;             //所属部门
    seatcount: string;              //座位数
    brand: string;                  //品牌
    color: string;                  //颜色
}

export class DepartmentBean {
    departmentid: string;           //部门编号
    departname: string;             //部门名称
}

export class BusDetailInfoBean {
    startsite: string;              //起点站
    endsite: string;                //终点站
    direction: number;              //上行／下行
    currentsite: string;            //当前站点
    tofrontdistance: string;        //与前车距离
    tobackdistance: string;         //与后车距离
    planKM: number;                 //当此里程
    completeKM: number;             //已行驶里程
    planTotalCount: number;         //预完成班次
    completeTotalCount: number;     //已完成班次
    completeTime: number;           //在线时长
}

export class BusDepartmentBean {
    departmentid: string;           //部门编号
    departname: string;             //部门名称
}

export class BusViolationBean {
    busNo: string;                  //车牌号码
    departmentName: string;         //部门名称
    lineName: string;               //线路名称
    violationsCount: number;        //违章＋违法记录数
    colorLevel: number;             //颜色等级
}

export class BusOperationBar {
    resultStr: string;              //时间文字
    completeBusCount: number;       //完成班次
}

export class BusOperationAnlysisBean {
    barInfo: BusOperationBar[];     //图标信息
    planTotalCount: number;         //预计完成总班次
    completeTotalCount: number;     //已经完成总班次
    readyCount: number;             //正点班次
    lateCount: number;              //超时班次
    earlyCount: number;             //提前班次
    completeKM: number;             //运营里程
    emptyKM: number;                //空驶里程
    completeTime: number;           //运营工时
}

/////////////////////////////////////////////////////////

export class BusDriverCompleteTask {
    realRunTime: string;            //实际发车时间
    startSite: string;              //起点站名称
    endSite: string;                //终点站名称
}

export class BusDriverReadyTask {
    planRunTime: string;            //计划发车时间
    startSite: string;              //起点站名称
    endSite: string;                //终点站名称
}

export class BusDriverDoingTask {
    realRunTime: string;            //计划发车时间
    startSite: string;              //起点站名称
    endSite: string;                //终点站名称
    currentSite: string;            //当前站点名称
    frontDistance: number;          //与前车距离
    backDistance: number;           //与后车距离
}

export class BusTasksRespBean {
    completeTasks: BusDriverCompleteTask[]; //已完成班次集合
    readyTasks: BusDriverReadyTask[];       //等待发车集合
    doingTasks: BusDriverDoingTask[];       //已发车集合
}

export class DispatchplanRespBean {
    startSite: string;              //起始站点
    endSite: string;                //终点站点
    realRunTime: string;            //实际出发时间
    realArriveTime: string;         //实际到达时间
    realCostTime: string;           //实际耗时
    differTime: number;             //差异时间值
    differState: number;            //差异状态
}

export class BusDriverOperationInfo {
    textInfo: string;               //时间文字
    completeCount: string;          //完成班次
}

export class BusDriverOperationRespBean {
    barInfo: BusDriverOperationInfo[];
    readyTotalCount: number;        //预完成总班次
    completeTotalCount: number;     //已完成总班次
    rightCount: number;             //正点班次
    longCount: number;              //超时班次
    shortCount: number;             //提前班次
    operatingKM: number;            //运营里程
    deadheadKM: number;             //空驶里程
    operatingDuration: number;      //运营工时
}

export class SalaryBean {
    realSalaryAmount: number;       //实发工资金额
    addAmount: number;              //加项金额
    subAmount: number;              //减项金额

    basicSalary: number;            //基本工资
    meritSalary: number;            //绩效工资
    overTimeSalary: number;         //加班工资
    nightSalary: number;            //夜班工资
    subsidies: number;              //副食补助
    oilSection: number;             //节超油
    materialSection: number;        //节超料
    postSubsidy: number;            //岗位补贴
    monthAward: number;             //月奖
    quarterAward: number;           //季度奖
    fulltimeAward: number;          //全勤奖
    coolFee: number;                //降温费
    festivalFee: number;            //过节费
    otherFee: number;               //其他

    pension: number;                //养老金
    houseMoney: number;             //住房公积金
    deduction: number;              //扣款
    tax: number;                    //个税
    borrowMoney: number;            //借款
    illegalMoney: number;           //违章
    other: number;                  //其他
}

export class BusInsuranceBean {
    insuredObj: string;                         //被保险人
    insuredObjOrgCode: string;                  //被保险人组织机构代码
    busNo: string;                              //车牌号码
    vehicleType: string;                        //机动车种类
    useProp: string;                            //使用性质
    egineNo: string;                            //发动机号码
    discriminateCode: string;                   //识别代码（车架号）
    factoryPlateCode: string;                   //厂牌型号
    maxPassanger: number;                       //核定载客
    outputValue:  number;                       //排量
    insuranceStartTime: string;                 //保险开始时间
    insuranceEndTime: string;                   //保险结束时间
    insuranceTotalMoney: number;                //保险总金额
    vehicleLossInsuranceMoney: number;          //机动车损失保险(A)
    thirdPartyLiabilityInsuranceMoney: number;  //第三方责任保险(B)
    vehicleDamageInsuranceMoney: number;        //车身划痕损失险(L)
    excludingOdds: number;                      //不记免赔率（M）覆盖A
    compulsoryLiabilityInsuranceMoney: number;  //机动车强制责任保险
    travelTaxMoney: number;                     //车船税
}

export class BusDriverDepartNoticeBean {
  departDate: string;                           //发车时间
  departStartPosition: string;                  //始发站
  departEndPosition: string;                    //终点站
}

export class BusDriverSafeNoticeBean {
  dateTime: string;                             //发生时间
  location: string;                             //发生地点
  lawTitle: string;                             //法律条款
}

export class  BusDriverNameAndNoBean {
  busno: string;                                //车牌号
  drivername: string;                           //司机名
}

export class  TaxiDriverNameAndNoBean {
  carno: string;                                //车牌号
  drivername: string;                           //司机名
}

/////////////////////////////////////////////////////////
export class ProjectSignTimesRepBean {
  date: string;
  loginAccountId: string;
  loginDepartId: string;
  loginRoleId: string;
  times: string;
  loginName: string;
  users: any;
}

export class ProjectItemBean {
  projectCode: string;
  projectName: string;
}

export class SignInfoBean {
  projectCode: string;
  projectName: string;
  users: string[];
}

export class ProjectAccountBean {
    accountId: string;
    accountName: string;
    departId: string;
    roleId: string;
    roleName: string;
}

export class SignLocBean {
  signinAddr: string;
  signinLonLat: string;
  signoutAddr: string;
  signoutLonLat: string;
}

export class AMapLocInfo {
  id: string;
  name: string;
  location: string;
  address: string;
}

export class ProjectFileInfo {
  projectCode: string;
  projectName: string;
  fileNum: string;
  files: FileInfo[];
}

export class FileInfo {
  fileName: string;
  filePath: string;
  fileSize: string;
}

export class ProjectFileContent {

}

export class ProjectDetailBean {
  projectCode: string;
  projectName: string;
  projectAddr: string;
  lonLat: string;
  equips: EquipmentGPS[];
}

export class EquipmentGPS {
  equipmentCode: string;
  date: string;
  state: string;
  longitude: string;
  latitude: string;
}

export class CameraBean {
    channelName: string;
    guId: string;
    onLineStatus: string;
}

export class CameraVideoUrl {
    guId: string;
    playUrl: string;
}

export class StationCameraBean {
    id: string;
    cameras: CameraVideoUrl[];
}

////////////////////////////////////////////////////////
export class PatrolCarBean {
  id: string;
  name: string;
  carCode: string;
  videoMac: string;
  organization: string;
}

export class RoadMgrEventStep {
    Mobile: string;
    Opinion: string;
    OrganizationName: string;
    ReceiveDateTime: string;
    ReceivePerson: string;
}

export class RoadMgrEventBean {
    AfterPicture: string;
    AllotCode: string;
    AllotedDate: string;
    EventContent: string;
    EventFeedback: string;
    FeedbackTime: string;
    ID: string;
    Lane: number;
    LatitudeLongitude: string;
    Mark: string;
    PatorCateGory: string;
    PatorlItem: string;
    Picture: string;
    ReceiveOrg: string;
    ReceiveTime: string;
    Receiver: string;
    RoadLine: string;
    SendOrg: string;
    SendPerson: string;
    Status: string;
    Step: RoadMgrEventStep[];
}

export class RoadMgrLawBean {
    PatorlCateGory_ID: string;
    RoadLawContent: string;
    PatorlItemName: string;
    HandleRegulations: string;
    ID: string;
    PatorlCateGoryName: string;
    RoadLaw: string;
    RoadSafeContent: string;
    PatorlItem_ID: string;
}

export class PatorlBean {
    DetailsCount: number;
    PatorlCar: string;
    PatorlRoadLines: string;
    ID: string;
    PatorlDate: string;
    Person: string;
    Auxiliaries: string;
    PatorlType: string;
}
