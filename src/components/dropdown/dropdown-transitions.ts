import { PageTransition, Animation } from 'ionic-angular';
import { CSS, nativeRaf } from 'ionic-angular/util/dom';

const DROPDOWN_IOS_BODY_PADDING = 2;

export class DropdownTransition extends PageTransition {
    positionView(nativeEle, ev) {
        let originY = 'top';
        let originX = 'left';
        let popoverWrapperEle = nativeEle.querySelector('.dropdown-wrapper');
        let popoverEle = nativeEle.querySelector('.dropdown-content');
        let popoverDim = popoverEle.getBoundingClientRect();
        let popoverWidth = popoverDim.width;
        let popoverHeight = popoverDim.height;
        let bodyWidth = window.innerWidth;
        let bodyHeight = window.innerHeight;
        let targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2);
        let targetWidth = targetDim && targetDim.width || 0;
        let targetHeight = targetDim && targetDim.height || 0;

        let popoverCSS = {
            top: targetTop + targetHeight - 1,
            left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
        };
        if (popoverCSS.left < DROPDOWN_IOS_BODY_PADDING) {
            popoverCSS.left = DROPDOWN_IOS_BODY_PADDING;
        }
        else if (popoverWidth + DROPDOWN_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - DROPDOWN_IOS_BODY_PADDING;
            originX = 'right';
        }
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            popoverCSS.top = targetTop - popoverHeight + 1;
            nativeEle.className = nativeEle.className + ' dropdown-bottom';
            originY = 'bottom';
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = DROPDOWN_IOS_BODY_PADDING + '%';
        }

        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        popoverEle.style[CSS.transformOrigin] = originY + ' ' + originX;
        popoverWrapperEle.style.opacity = '1';
    }
}

export class DropdownOpen extends DropdownTransition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        let backdrop = new Animation(ele.querySelector('ion-backdrop'));
        let wrapper = new Animation(ele.querySelector('.dropdown-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1);
        backdrop.fromTo('opacity', 0.01, 0.08);
        this
            .easing('ease')
            .duration(100)
            .add(backdrop)
            .add(wrapper);
    }
    play() {
        nativeRaf(() => {
            this.positionView(this.enteringView.pageRef().nativeElement, this.opts.ev);
            super.play();
        });
    }
}
export class DropdownClose extends DropdownTransition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        let backdrop = new Animation(ele.querySelector('ion-backdrop'));
        let wrapper = new Animation(ele.querySelector('.dropdown-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        backdrop.fromTo('opacity', 0.08, 0);
        this
            .easing('ease')
            .duration(500)
            .add(backdrop)
            .add(wrapper);
    }
}