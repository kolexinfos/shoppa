import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from 'ionic-native';

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CampaignProvider]
})
export class HomePage {
  campaignOject: {name?:string, image?:string, description?: string, likes?: number, shares?:number, wantin?:number } = {};
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

  likeCampaign(campaign){
    console.log(campaign.name + ' has been liked');

    //TODO: Pick the User Email from localstorage
    campaign.email = 'koexinfos@gmail.com';

    console.log(campaign);
    this.campaignProvider.LikeCampaigns(campaign).subscribe(
      data => {
        console.log(data.result);

      },
      err => {
        console.log(err);
      },
      () => console.log(campaign.name + ' campaign was liked.')
    )

    //Toast.show(campaign.name + " liked", "short", 'bottom').subscribe(
    //    toast => {
    //    console.log(toast);
    //  }
    //);

  }

  optInToCampaign(campaign){
    console.log(campaign.name + ' has been opted into' );
    Toast.show(campaign.name + " opted in to", "short", 'bottom').subscribe(
        toast => {
        console.log(toast);
      }
    );
  }

  shareCampaign(campaign){
    console.log(campaign.name + ' has been shared');

    Toast.show(campaign.name + " shared", "short", 'bottom').subscribe(
        toast => {
        console.log(toast);
      }
    );
  }

}
