import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {

  constructor(private navCtrl: NavController) {

  }

  startApp() {
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

}
