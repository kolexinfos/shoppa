import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MenuController, NavController, LocalStorage , Storage } from 'ionic-angular';
import 'rxjs/add/operator/map';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(private http: Http) {}

  RegisterUser(userObject){
    let body = JSON.stringify({ userObject });
    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var url = 'https://shoppa.herokuapp.com/users/register';

    var response = this.http.post(url,userObject, options);
    return response;
  }

  GetLocalUser(){
    return window.localStorage.getItem('user');

  }

  SetLocalUser(user){
    window.localStorage.setItem('user', user);
  }

}

