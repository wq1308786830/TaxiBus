import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';


@Component({
  templateUrl: 'mainPage.html'
})
export class RealMonitorMainpage implements OnInit {
  private curSelElement: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onClickItem(event) {
    if (event.currentTarget === this.curSelElement && this.curSelElement) {
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[1].style['display'] = 'inline-block';
        this.curSelElement.children[2].style['display'] = 'none';
      }
      this.curSelElement = null;
    } else {
      if (this.curSelElement && this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'none';
        this.curSelElement.style['color'] = '#222';
        this.curSelElement.children[1].style['display'] = 'inline-block';
        this.curSelElement.children[2].style['display'] = 'none';
      }

      this.curSelElement = event.currentTarget;
      if (this.curSelElement.nextElementSibling) {
        this.curSelElement.nextElementSibling.style['display'] = 'block';
        this.curSelElement.style['color'] = '#387ef5';
        this.curSelElement.children[1].style['display'] = 'none';
        this.curSelElement.children[2].style['display'] = 'inline-block';
      }

      this.content.scrollTo(0, this.curSelElement.offsetTop);
    }
  }
}