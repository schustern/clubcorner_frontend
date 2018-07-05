import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home';
import {login} from "../../Schema/login.schema";
import {Services} from "../../providers/trainer/trainer";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  homePage = HomePage;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string}>;
  daten: login;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _teamProv: Services) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(HomePage);
    //this.postData();
  }


 /* postData(){
     this._teamProv.logIn(this.daten).subscribe(
    (data) => {
     console.log(data);
    },
    error => console.log(error)
    )
  }*/
}
