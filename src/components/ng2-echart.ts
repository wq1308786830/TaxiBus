declare var echarts;

import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'ng2-echart',
    template: `<div></div>`
})
export class Ng2Echart implements OnDestroy, OnInit {

    @Input() options: any;

    echart: any;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.echart = echarts.init(this.element.nativeElement);
        this.refresh();
    }

    ngAfterViewInit() {
    }

    AfterContentInit() {
        
    }

    ngOnDestroy() {
        if (!this.echart.isDisposed()) {
            this.echart.dispose();
        }
    }

    refresh() {
        if (this.options && this.echart) {
            var eChartOptions = Object.assign({}, this.options);
            this.echart.setOption(eChartOptions);
        }
    }
}