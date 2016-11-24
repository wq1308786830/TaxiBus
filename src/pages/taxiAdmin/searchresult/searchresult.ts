import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, GestureController, GestureDelegate, Platform, ViewController } from 'ionic-angular';
import { UIEventManager, PointerEvents } from 'ionic-angular/util/ui-event-manager';
import { CSS, pointerCoord } from 'ionic-angular/util/dom';
import { TaxiSearchInfo } from '../../../beans/beans';
import { TaxiAdminService } from '../../../services/taxi-admin-service';
import { GoogleMap } from 'ionic-native';
import { TaxiAdminSearchMap } from '../searchmap/searchmap';
import { TaxiAdminDetail } from '../detail/detail';


@Component({
  templateUrl: 'searchresult.html'
})
export class TaxiAdminSearchResult implements OnInit, OnDestroy {

  @ViewChild(Content) content: Content;
  @ViewChild('listlayer') searchList;

  public title: string;
  public departMentId: string;
  public gMap: GoogleMap;
  public mapControler: TaxiAdminSearchMap;

  public gestureDelgate: GestureDelegate;
  public eventMgr: UIEventManager;
  public pointerEvents: PointerEvents;

  /**
   * The Y coordinate of where the user started to the pull down the content.
   */
  public startY: number = 0;

  /**
   * The offset off the list view.
   */
  public offsetY: number = 0;

  /**
   * The distance between the start of the pull and the current touch or
   * mouse event's Y coordinate.
   */
  public deltaY: number = 0;

  public MAX_OFFSET_TO_BOTTOM: number = 120;

  public taxiList: TaxiSearchInfo[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public taxiAdminService: TaxiAdminService,
    public platform: Platform,
    public viewCtrl: ViewController,
    public gestureCtrl: GestureController) {
    this.title = navParams.get("key");
    this.taxiList = navParams.get("data");
    this.departMentId = navParams.get("id");
    this.gMap = navParams.get("map");
    this.mapControler = navParams.get("mapControler");

    this.gestureDelgate = gestureCtrl.createGesture({name: 'mapRefresher', priority: 0 });
    this.eventMgr = new UIEventManager(false);
  }

  ngOnInit() {
    this.setListeners(true);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.setListeners(false);
    this.gestureDelgate.destroy();
  }

  setListeners(shouldListen) {
    this.eventMgr.unlistenAll();
    this.pointerEvents = null;

    if (shouldListen) {
      this.pointerEvents = this.eventMgr.pointerEvents({
        element: this.searchList.nativeElement,
        pointerDown: this.onStart.bind(this),
        pointerMove: this.onMove.bind(this),
        pointerUp: this.onEnd.bind(this)
      });
    }
  }

  onStart(ev) {
    // if multitouch then get out immediately
    if (ev.touches && ev.touches.length > 1) {
      return false;
    }

    let scrollHostScrollTop = this.content.getContentDimensions().scrollTop;

    // if the scrollTop is greater than zero then it's
    // not possible to pull the content down yet
    if (scrollHostScrollTop > 0) {
      return false;
    }

    if (!this.gestureDelgate.canStart()) {
      return false;
    }

    let coord = pointerCoord(ev);
    this.startY = coord.y;
    return true;
  }

  onMove(ev) {
    // if multitouch then get out immediately
    if (ev.touches && ev.touches.length > 1) {
      return 1;
    }

    if (!this.gestureDelgate.canStart()) {
      return 0;
    }

    if (this.startY == 0) {
      return 2;
    }

    // get the current pointer coordinates
    let coord = pointerCoord(ev);

    // it's now possible they could be pulling down the content
    // how far have they pulled so far?
    this.deltaY = (coord.y - this.startY);
    if (this.offsetY == 0 && this.deltaY <= 0) {
      return 6;
    }

    // prevent native scroll events
    ev.preventDefault();

    // the refresher is actively pulling at this point
    // move the scroll element within the content element
    this.setCss(this.offsetY + this.deltaY, '0ms', true, '');

    if (!this.deltaY) {
      // don't continue if there's no delta yet
      return 8;
    }
  }

  onEnd(ev) {
    if (this.deltaY > 0) {
      this.offsetY = window.screen.height - this.MAX_OFFSET_TO_BOTTOM;
      this.setCss(this.offsetY, '0ms', true, '');

      this.gMap.setClickable(true);
    } else if (this.deltaY < 0) {
      this.offsetY = 0;
      this.setCss(this.offsetY, '0ms', true, '');

      let scrollTop = this.content.getContentDimensions().scrollTop;
      // if the scrollTop is greater than zero then it's
      // not possible to pull the content down yet
      if (scrollTop >= 0) {
        this.gMap.setClickable(false);
      } else {
        this.gMap.setClickable(true);
      }
    }
  }

  setCss(position, duration, overflowVisible, delay) {
    if (position >= 0) {
      this.searchList.nativeElement.style[CSS.transform] = ('translateY(' + position + 'px) translateZ(0px)');
      this.searchList.nativeElement.style[CSS.transitionDuration] = duration;
      this.searchList.nativeElement.style[CSS.transitionDelay] = delay;
      this.searchList.nativeElement.style['overflow'] = (overflowVisible ? 'hidden' : '');
    }
  };

  doInfinite(ev) {

  }

  onCLickBack() {
    this.viewCtrl.dismiss('backDrop');
    this.mapControler.navCtrl.pop();
  }

  onClickItem(taxi) {
    this.taxiAdminService.getTaxiBaseInfoAndFaultCountByCarNo(taxi.carNo).subscribe(info => {
      if (info) {
        this.navCtrl.push(TaxiAdminDetail, {driverInfo: info});
      }
    });
  }
}
