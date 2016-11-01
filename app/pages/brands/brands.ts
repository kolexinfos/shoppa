import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the BrandsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/brands/brands.html',
})
export class BrandsPage {
  
  search: {text?:string,email?:string} = {};

  constructor(private navCtrl: NavController) {

  }

}
