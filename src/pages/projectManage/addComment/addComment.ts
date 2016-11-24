import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'addComment.html'
})
export class ProjectManageAddComment implements OnInit {

public signFlag: boolean = true;

  constructor(public navCtrl: NavController){

  }

  ngOnInit(): void {

  }
}
