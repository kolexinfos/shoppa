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
  user:{email?: string} = {};

  constructor(public navCtrl: NavController, private campaignProvider: CampaignProvider, private userProvider: UserProvider) {
    this.user.email = userProvider.GetLocalObject("user");
    this.getCampaigns();
  }

  getCampaigns(){
    console.log(this.user);

    this.campaignProvider.GetUserCampaigns(this.user).subscribe(
        data => {
        console.log(data.result);
        this.campaigns = data.result;

        //_.filter(data.result, {likes: [{email: this.user.email}] });
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
