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

  constructor(private http: Http) {

  }

  GetCampaigns(){
    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var response = this.http.get(this.url, options)
      .map(res => res.json());
    return response;
  }

}

