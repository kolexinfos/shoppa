import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { CampaignProvider } from '../../providers/campaign-provider/campaign-provider';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

import { UserProvider } from '../../providers/user-provider/user-provider';

/*
  Generated class for the FavoritesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/favorites/favorites.html',
   providers: [CampaignProvider, UserProvider]
})
export class FavoritesPage {

  user:{email?: string} = {};
  campaigns = [];
  following = [];

  constructor(private navCtrl: NavController,
              private campaignProvider: CampaignProvider,
              private userProvider: UserProvider,
              public modalCtrl: ModalController
  ) {

    this.user.email = userProvider.GetLocalObject("user");
    this.getLikeCampaigns();
    this.getFollowCampaigns();
  }

  getLikeCampaigns(){
    console.log(this.user);

    this.campaignProvider.GetUserLikes(this.user).subscribe(
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

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.campaigns);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {

      }
    });

  }

  getFollowCampaigns(){
    console.log(this.user);

    this.campaignProvider.GetUserCampaigns(this.user).subscribe(
        data => {
        console.log(data.result);
        this.following = data.result;

        //_.filter(data.result, {likes: [{email: this.user.email}] });
      },
        err => {
        console.log(err);
      },
      () => console.log('Pulling data')
    )
  }

}
