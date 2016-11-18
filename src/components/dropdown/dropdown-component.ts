import {
    Component, ComponentFactoryResolver, ElementRef, HostListener,
    Renderer, ViewChild, ViewContainerRef
} from '@angular/core';
import { NavParams, ViewController, Config } from 'ionic-angular';
import { Key } from 'ionic-angular/util/key';

let dropdownIds = -1;

@Component({
    selector: 'bird-dropdown',
    template: `
        <ion-backdrop (click)="_bdClick()" [class.hide-backdrop]="!opts.showBackdrop"></ion-backdrop>
        <div class="dropdown-wrapper">
            <div class="dropdown-content">
                <div class="dropdown-viewport">
                    <div #viewport nav-viewport></div>
                </div>
            </div>
        </div>
    `
})
export class DropdownCom {
    @ViewChild('viewport', { read: ViewContainerRef }) _viewport;

    opts: any;
    id: number;
    _enabled: boolean;

    constructor(public _cfr: ComponentFactoryResolver,
        public _elementRef: ElementRef,
        public _renderer: Renderer,
        public _config: Config,
        public _navParams: NavParams,
        public _viewCtrl: ViewController) {
        this.opts = _navParams.data.opts;
        if (this.opts.cssClass) {
            this.opts.cssClass.split(' ').forEach(cssClass => {
                if (cssClass.trim() !== '')
                    _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++dropdownIds);
    }

    ngAfterViewInit() {
        this._load(this._navParams.data.component);
    }

    _load(component) {
        if (component) {
            const componentFactory = this._cfr.resolveComponentFactory(component);
            const componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
            this._viewCtrl._setInstance(componentRef.instance);
            this._enabled = true;
        }
    }

    _setCssClass(componentRef, className) {
        this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
    }

    _bdClick() {
        if (this._enabled && this.opts.enableBackdropDismiss) {
            return this._viewCtrl.dismiss(null, 'backdrop');
        }
    }

    @HostListener('body:keyup', ['$event'])
    _keyUp(ev) {
        if (this._enabled && ev.keyCode === Key.ESCAPE && this._viewCtrl.isLast()) {
            this._bdClick();
        }
    }
}
