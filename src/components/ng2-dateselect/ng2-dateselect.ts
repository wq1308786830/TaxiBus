import { Component, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';
import { DropdownController } from '../../components/dropdown/dropdown';
import { Ng2DatePicker } from '../../components/ng2-datepicker/ng2-datepicker';

@Component({
    selector: 'bird-dateselect',
    templateUrl: 'ng2-dateselect.html'
})
export class Ng2DateSelect {
    public selectType: string;

    public curYear: number;

    public startDate: Date;
    public endDate: Date;

    public curMonth: Date;
    public preMonth: Date;
    public nextMonth: Date;

    @Output() datePickCB: EventEmitter<any> = new EventEmitter();

    constructor(public _app: App, public dropdownCtrl: DropdownController) {
        this.selectType = "month";

        this.startDate = new Date();
        this.endDate = new Date();

        this.curMonth = new Date();
        this.preMonth = new Date();
        this.preMonth.setMonth(this.curMonth.getMonth() - 1);
        this.nextMonth = new Date();
        this.nextMonth.setMonth(this.curMonth.getMonth() + 1);

        this.curYear = this.curMonth.getFullYear();
    }

    ngOnInit() {
    }

    onClickSelect(ev) {
      let targetEl = ev.target.parentNode.parentNode;
      if (targetEl.previousElementSibling && !targetEl.nextElementSibling) {
        this.preMonth = new Date(this.curMonth);
        this.preMonth.setMonth(this.curMonth.getMonth());
        this.curMonth = new Date(this.curMonth);
        this.curMonth.setMonth(this.curMonth.getMonth() + 1);
        this.nextMonth = new Date(this.curMonth);
        this.nextMonth.setMonth(this.curMonth.getMonth() + 1);
        this.startDate = this.preMonth;
        this.endDate = this.nextMonth;
        this.curYear = this.curMonth.getFullYear();
        if (this.datePickCB) {
          this.datePickCB.emit({type: 'month', month: this.curMonth});
        }
      }
      if (!targetEl.previousElementSibling && targetEl.nextElementSibling) {
        this.preMonth = new Date(this.curMonth);
        this.preMonth.setMonth(this.curMonth.getMonth() - 2);
        this.curMonth = new Date(this.curMonth);
        this.curMonth.setMonth(this.curMonth.getMonth() - 1);
        this.nextMonth = new Date(this.curMonth);
        this.nextMonth.setMonth(this.curMonth.getMonth() + 1);
        this.startDate = this.preMonth;
        this.endDate = this.nextMonth;
        this.curYear = this.curMonth.getFullYear();
        if (this.datePickCB) {
          this.datePickCB.emit({type: 'month', month: this.curMonth});
        }
      }
      if (this.datePickCB) {
        this.datePickCB.emit({type: 'month', month: this.curMonth});
      }
      if (targetEl.previousElementSibling && targetEl.nextElementSibling){
        let datePicker = this.dropdownCtrl.create(Ng2DatePicker, {
          datePickCB: this.datePickRes.bind(this)
        });
        datePicker.present({ ev: ev });
      }
    }

    datePickRes(date: any) {
        if (date.type === 'cumtom') {
            this.selectType = date.type;
            this.startDate = date.start;
            this.endDate = date.end;

            if (this.datePickCB) {
                this.datePickCB.emit({type: 'cumtom', start: this.startDate, end: this.endDate});
            }
        } else if (date.type === 'month') {
            this.selectType = date.type;

            this.curMonth = new Date();
            this.curMonth.setFullYear(this.curYear);
            this.curMonth.setMonth(date.month-1);

            this.preMonth = new Date(this.curMonth);
            this.preMonth.setMonth(this.curMonth.getMonth() - 1);

            this.nextMonth = new Date(this.curMonth);
            this.nextMonth.setMonth(this.curMonth.getMonth() + 1);


            if (this.datePickCB) {
                this.datePickCB.emit({type: 'month', month: this.curMonth});
            }
        } else if (date.type === 'year') {
            this.selectType = date.type;
            this.curYear = date.year;

            if (this.datePickCB) {
                this.datePickCB.emit({type: 'year', year: this.curYear});
            }
        }
    }
}
