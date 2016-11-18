import { Plugin, Cordova } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Plugin({
    pluginName: 'HNBridge',
    plugin: 'cordova-plugin-hnbridge',
    pluginRef: 'window.HNBridge',
    repo: '',
    platforms: ['Android', 'iOS']
})
export class HNBridge {

    constructor() {
    }

    @Cordova({})
    static playVideoUrl(url: string, title: string) {
    }

    @Cordova({})
    static gotoPage(page: string) {
    }

    @Cordova({})
    static setAccountId(accountId: string, isManager: boolean) {
    }

    @Cordova({})
    static getPushChannelId(callback) {
    }
}