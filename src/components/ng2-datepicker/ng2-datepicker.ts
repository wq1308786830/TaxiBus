import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { App, NavParams } from 'ionic-angular';

@Component({
    selector: 'bird-datepicker',
    templateUrl: 'ng2-datepicker.html'
})
export class Ng2DatePicker implements OnInit {
    @Output() clickListener: EventEmitter<any> = new EventEmitter();

    public datetype = "month";
    public months1 = [1, 2, 3, 4, 5, 6];
    public months2 = [7, 8, 9, 10, 11, 12];

    public years1 = [];
    public years2 = [];

    public startDay: string;
    public endDay: string;
    public selectMonth: number;
    public selectYear: number;

    constructor(public _app: App, public navParams: NavParams) {
        let datePipe = new DatePipe('en-US');
        let curTime = new Date();

        for (let index=0; index<6; index++) {
            this.years1.push(curTime.getFullYear() - 11 + index);
            this.years2.push(curTime.getFullYear() - 5 + index);
        }

        this.selectMonth = curTime.getMonth() + 1;
        this.selectYear = curTime.getFullYear();
        this.endDay = datePipe.transform(curTime, 'yyyy-MM-dd');

        curTime.setDate(curTime.getDate() - 7);
        this.startDay = datePipe.transform(curTime, 'yyyy-MM-dd');

        if (this.navParams.data) {
            if (this.navParams.data.datePickCB) {
                this.clickListener.subscribe(this.navParams.data.datePickCB);
            }
        }
    }

    ngOnInit() {
    }

    getMonthColor(month) {
        if (month === this.selectMonth) {
            return 'danger';
        } else {
            return '';
        }
    }

    getYearColor(year) {
        if (year === this.selectYear) {
            return 'danger';
        } else {
            return '';
        }
    }

    onClickClear() {
        this._app.navPop();
    }

    onClickOk() {
        this._app.navPop();
        if (this.clickListener) {
            this.clickListener.emit({type: 'cumtom', start: this.startDay, end: this.endDay});
        }
    }

    onCLickMonth(month) {
        this._app.navPop();
        if (this.clickListener) {
            this.clickListener.emit({type: 'month', month: month});
        }
    }

    onClickYear(year) {
        this._app.navPop();
        if (this.clickListener) {
            this.clickListener.emit({type: 'year', year: year});
        }
    }
}
