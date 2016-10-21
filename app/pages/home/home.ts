import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast, SocialSharing } from 'ionic-native';

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CampaignProvider]
})

export class HomePage {
  campaignOject: {name?:string, image?:string, description?: string, likes?: number, shares?:number, wantin?:number } = {};
  campaigns = [];
  like:{email?:string, campaignid?:string} ={};
  buttonDisabled:boolean;
  user:{email?: string} = {};

  constructor(public navCtrl: NavController, private campaignProvider: CampaignProvider, private userProvider: UserProvider) {
    this.buttonDisabled = null;

    this.user.email = userProvider.GetLocalObject("user");
    this.getCampaigns();
  }

  ionViewWillEnter(){
    console.log('Entered into the view');
  }
  
  ionViewDidEnter(){
    console.log('Page was fully loaded');
  }

  getCampaigns(){
    console.log(this.user);
    
    this.campaignProvider.GetUserCampaigns(this.user).subscribe(
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

  likeCampaign(campaign){
    console.log(campaign.name + ' has been liked');


    this.like.email = this.user.email;
    this.like.campaignid = campaign._id;
    

    console.log(this.like);
    this.campaignProvider.LikeCampaigns(this.like).subscribe(
      data => {
        console.log(data.result);
        this.buttonDisabled = true;
        // Toast.show(campaign.name + " liked", "short", 'bottom').subscribe(
        //     toast => {
        //     console.log(toast);
        //   }
        // );

      },
      err => {
        console.log(err);
      },
      () => console.log(campaign.name + ' campaign was liked.')
    )
    this.getCampaigns();
  }

  optInToCampaign(campaign){
    console.log(campaign.name + ' has been opted into' );

    this.like.email = 'kolexinfos@gmail.com';
    this.like.campaignid = campaign._id;
    //TODO: Pick the User Email from localstorage

    this.campaignProvider.WantInCampaign(this.like).subscribe(
        data => {
        console.log(data.result);
          Toast.show(campaign.name + " opted in to", "short", 'bottom').subscribe(
              toast => {
              console.log(toast);
            }
          );
      },
        err => {
        console.log(err);
      },
      () => console.log(campaign.name + ' campaign was liked.')
    )

    this.getCampaigns();
  }

  shareCampaign(campaign){
    console.log(campaign.name + ' has been shared');

    this.like.email = 'kolexinfos@gmail.com';
    this.like.campaignid = campaign._id;
    //TODO: Pick the User Email from localstorage

    SocialSharing.share(campaign.description, campaign.name,campaign.image).then(() =>{
      console.log("Success");

        this.campaignProvider.ShareCampaign(campaign).subscribe(
            data => {
            console.log(data.result);
              Toast.show(campaign.name + " shared", "short", 'bottom').subscribe(
                  toast => {
                  console.log(toast);
                }
              );
          },
            err => {
            console.log(err);
          },
          () => console.log(campaign.name + ' campaign was shared.')
        )

    }).catch(() => {
      console.log("Error");
    });

    this.getCampaigns();
  }

}
