import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CampaignProvider]
})
export class TrendingPage {
  campaigns = [];

  constructor(public navCtrl: NavController, private campaignProvider: CampaignProvider, private userProvider: UserProvider) {
    campaignProvider.GetUserCampaigns(userProvider.GetLocalObject("user")).subscribe(
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
