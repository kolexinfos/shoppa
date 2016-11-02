import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user-provider/user-provider';
import { BrandProvider } from '../../providers/brand-provider/brand-provider';

/*
  Generated class for the BrandsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/brands/brands.html',
  providers : [BrandProvider, UserProvider]
})
export class BrandsPage {
  
  search: {text?:string,email?:string} = {};
  brands = [];

  constructor(private navCtrl: NavController,
  private brandProvider: BrandProvider, 
  private userProvider:UserProvider,
  private loadingCtrl: LoadingController
  ) 
  {
    this.GetBrands();
  }
  
  GetBrands(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    
    loadingPopup.present();

    this.brandProvider.GetBrands().subscribe(
        data => {
          console.log(data.result);
          this.brands = data.result;
          loadingPopup.dismiss();

         //_.filter(data.result, {likes: [{email: this.user.email}] });
        },
        err => {
          loadingPopup.dismiss();
          console.log(err);
          
      },
      () => {
        console.log('Pulling data');
        loadingPopup.dismiss();
      }
    )
  }

}
