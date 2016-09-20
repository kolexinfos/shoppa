import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceProvider {

  public message:any = 'The page rocks'
  constructor(private http: Http) {}

  getCampaigns(message) {
    var url = 'https://shoppa.herokuapp.com/';
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  //getCampaigns(message){
  //  this.message = message;
  //}

}

