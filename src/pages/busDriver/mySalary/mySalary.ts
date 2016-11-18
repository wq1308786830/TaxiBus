import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { SalaryBean } from '../../../beans/beans';
import { BusDriverService } from '../../../services/bus-driver-service';
import { LoginService } from '../../../services/login-service';
import { DatePipe } from '@angular/common';


@Component({
  templateUrl: 'mySalary.html'
})
export class BusDriverMysalary implements OnInit {
  public mySalaryInfo: SalaryBean;
  private curSelElement: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public busDriverService: BusDriverService,
    public loginService: LoginService) {
    this.mySalaryInfo = new SalaryBean();
  }

  ngOnInit() {
    let curTime = new Date();
    let datePipe = new DatePipe('en-US');
    let curTimeStr = datePipe.transform(curTime, 'yyyyMM');
    this.busDriverService.getSalaryDetailByCondition(this.loginService.accountInfo.id, curTimeStr).subscribe(data => {
      if (data && data.length > 0) {
        this.mySalaryInfo = data[0];
      }
    });
  }

  ngAfterViewInit() {
  }

  onClickItem(event) {
    if (event.currentTarget === this.curSelElement && this.curSelElement) {
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[0].style['display'] = 'inline-block';
        this.curSelElement.children[1].style['display'] = 'none';
      }
      this.curSelElement = null;
    } else {
      if (this.curSelElement && this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[0].style['display'] = 'inline-block';
        this.curSelElement.children[1].style['display'] = 'none';
      }

      this.curSelElement = event.currentTarget;
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'block';
        this.curSelElement.style['color'] = '#387ef5';
        this.curSelElement.children[0].style['display'] = 'none';
        this.curSelElement.children[1].style['display'] = 'inline-block';
      }

      this.content.scrollTo(0, this.curSelElement.offsetTop);
    }
  }
}
