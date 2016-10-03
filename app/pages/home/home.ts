import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CampaignProvider]
})
export class HomePage {
  campaigns = [];

  constructor(public navCtrl: NavController, private campaignProvider: CampaignProvider) {
    campaignProvider.GetCampaigns().subscribe(
      data => {
        console.log(data.result);
        console.log(data.message);
        this.campaigns = data.result;
      },
      err => {
        console.log(err);
      },
      () => console.log('Pulling data')
    )
  }

  ionViewWillEnter(){
    console.log('Entered into the view');
  }



}
