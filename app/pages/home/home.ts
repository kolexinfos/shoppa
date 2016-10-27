import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast, SocialSharing } from 'ionic-native';

import * as _ from 'lodash'

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';

interface Like {email?:string, timestamp?:Date};
interface campaignObject {name?:string, image?:string, description?: string, likes: [any], shares?:number, wantin?:number };

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CampaignProvider, UserProvider]
})

export class HomePage {

  campaigns = [];
  like:{email?:string, campaignid?:string} ={};
  user:{email?: string} = {};

  constructor(public navCtrl: NavController, private campaignProvider: CampaignProvider, private userProvider: UserProvider) {

    console.log( _.sum([4, 2, 8, 6]) );
    this.user.email = userProvider.GetLocalObject("user");
    this.getCampaigns();
  }

  ionViewWillEnter(){
    console.log('Entered into the view');
  }

  ionViewDidEnter(){
    console.log('Page was fully loaded');
  }
  
  onCancel(event){
    console.log('Search Cancelled');
  }
  
  updateSchedule(){
    console.log('Search the datastore');
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

  likeCampaign(campaign){
    console.log(campaign.name + ' has been liked');


    this.like.email = this.user.email;
    this.like.campaignid = campaign._id;


    console.log(this.like);
    this.campaignProvider.LikeCampaigns(this.like).subscribe(
      data => {
        console.log(data.result);

        Toast.show(campaign.name + " liked", "short", 'bottom').subscribe(
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
