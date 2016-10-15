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

  GetCampaigns(){

    var response = this.http.get(this.url, this.options)
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

