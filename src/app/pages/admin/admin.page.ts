import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public currentUser: any;
  userLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user.uid;
        this.userLoggedIn = true;
      }
    });
  }

}
