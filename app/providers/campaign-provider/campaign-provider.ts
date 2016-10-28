import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CampaignProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CampaignProvider {
  url:string = 'https://shoppa.herokuapp.com/campaigns/';


  headers =  new Headers({'Content' : 'application/json'});
  options = new RequestOptions({ headers : this.headers});

  constructor(private http: Http) {

  }

  GetUserCampaigns(email){
    console.log('Username for user ' + email);
    var response = this.http.post(this.url + 'getUserCampaigns',email, this.options)
      .map(res => res.json());

    return response;
  }

  GetUserLikes(email){
    console.log('Get Likes for ' + email);

    var response = this.http.post(this.url + 'userCampaignLikes', email, this.options)
    .map(res => res.json());

    return response;
  }
  
   SearchCampaigns(searchObj){
    console.log('search for ' + searchObj.text);

    var response = this.http.post(this.url + 'searchCampaigns', searchObj, this.options)
    .map(res => res.json());

    return response;
  }

  LikeCampaigns(campaign){

      var response = this.http.post(this.url + 'likeCampaign',campaign, this.options)
        .map(res => res.json());

    return response;
  }

  ShareCampaign(campaign){
    var response = this.http.post(this.url + 'shareCampaign', campaign, this.options)
    .map(res => res.json());

    return response;
  }

  WantInCampaign(campaign){
    var response = this.http.post(this.url + 'wantinCampaign', campaign, this.options)
    .map(res => res.json());

    return response;
  }

}

