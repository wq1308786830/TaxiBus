import { Injectable } from '@angular/core';
import { App, ViewController, Config } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { DropdownCom } from './dropdown-component';
import { DropdownOpen, DropdownClose } from './dropdown-transitions';

export class Dropdown extends ViewController {
    _app: App;

    constructor(_app: App, component, data: any = {}, opts: DropdownOptions = {}) {
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

        data.component = component;
        data.opts = opts;

        super(DropdownCom, data, null);

        this._app = _app;
        this.isOverlay = true;
    }

    getTransitionName(direction) {
        let name = (direction === 'back' ? 'dropdown-close' : 'dropdown-open');
        return name;
    }

    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}

@Injectable()
export class DropdownController {
    constructor(private _app: App, private _config: Config) {
        _config.setTransition('dropdown-open', DropdownOpen);
        _config.setTransition('dropdown-close', DropdownClose);
    }

    create(component, data = {}, opts = {}) {
        return new Dropdown(this._app, component, data, opts);
    }
}

export interface DropdownOptions {
    cssClass?: string;
    showBackdrop?: boolean;
    enableBackdropDismiss?: boolean;
}